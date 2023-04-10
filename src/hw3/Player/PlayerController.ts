import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";

import Fall from "./PlayerStates/Fall";
import Idle from "./PlayerStates/Idle";
import Jump from "./PlayerStates/Jump";
import Walk from "./PlayerStates/Walk";
import Dead from "./PlayerStates/Dead";
import Talking from "./PlayerStates/Talking";
import Hurt from "./PlayerStates/Hurt";
import Combat from "./PlayerStates/Combat";

import PlayerWeapon from "./PlayerWeapon";
import Input from "../../Wolfie2D/Input/Input";

import { HW3Controls } from "../HW3Controls";
import HW3AnimatedSprite from "../Nodes/HW3AnimatedSprite";
import MathUtils from "../../Wolfie2D/Utils/MathUtils";
import { HW3Events } from "../Events/HW3Events";
import { CombatEvents } from "../Events/CombatEvents";
import GameEvent from "../../Wolfie2D/Events/GameEvent";

// TODO play your heros animations

/**
 * Animation keys for the player spritesheet
 */
export const PlayerAnimations = {
    IDLE: "IDLE",
    WALK: "WALK",
    ATTACK_1: "ATTACK_1",
    ATTACK_2: "ATTACK_2",
    TAKE_DAMAGE: "TAKE_DAMAGE",
    DYING: "DYING",
    DEATH: "DEATH",
    JUMP: "JUMP",
    FALL: "FALL",
    LAND: "LAND"
} as const

/**
 * Tween animations the player can player.
 */
export const PlayerTweens = {
    FLIP: "FLIP",
    DEATH: "DEATH"
} as const

/**
 * Keys for the states the PlayerController can be in.
 */
export const PlayerStates = {
    IDLE: "IDLE",
    WALK: "WALK",
	JUMP: "JUMP",
    FALL: "FALL",
    HURT: "HURT",
    DEAD: "DEAD",
    TALKING: "TALKING",
    COMBAT: "COMBAT",
} as const

/**
 * The controller that controls the player.
 */
export default class PlayerController extends StateMachineAI {
    public readonly MAX_SPEED: number = 400;
    public readonly MIN_SPEED: number = 300;

    /** Health and max health for the player */
    protected _health: number;
    protected _maxHealth: number;

    /** The players game node */
    protected owner: HW3AnimatedSprite;

    protected _velocity: Vec2;
	protected _speed: number;

    protected tilemap: OrthogonalTilemap;
    // protected cannon: Sprite;
    protected weapon: PlayerWeapon;
    protected _damage: number;

    protected isAttacking: Boolean;
    protected _enemyDamage: number;

    
    public initializeAI(owner: HW3AnimatedSprite, options: Record<string, any>){
        this.owner = owner;

        this.weapon = options.weaponSystem;

        this.tilemap = this.owner.getScene().getTilemap(options.tilemap) as OrthogonalTilemap;
        this.speed = 350;
        this.velocity = Vec2.ZERO;

        this.health = 5
        this.maxHealth = 5;

        this.damage = 1;

        this._enemyDamage = 0;

        this.isAttacking = false;

        // Add the different states the player can be in to the PlayerController 
		this.addState(PlayerStates.IDLE, new Idle(this, this.owner));
		this.addState(PlayerStates.WALK, new Walk(this, this.owner));
        this.addState(PlayerStates.JUMP, new Jump(this, this.owner));
        this.addState(PlayerStates.HURT, new Hurt(this, this.owner));
        this.addState(PlayerStates.FALL, new Fall(this, this.owner));
        this.addState(PlayerStates.DEAD, new Dead(this, this.owner));
        this.addState(PlayerStates.TALKING, new Talking(this, this.owner));
        this.addState(PlayerStates.COMBAT, new Combat(this, this.owner));
        
        // Start the player in the Idle state
        this.initialize(PlayerStates.IDLE);

        this.receiver.subscribe(CombatEvents.ENEMY_ATTACK_PHYSICAL);
    }

    // Override
    handleEvent(event: GameEvent): void {
        if(this.active){
            if (event.type === CombatEvents.ENEMY_ATTACK_PHYSICAL) {
                this._enemyDamage = event.data.get("dmg");
                this.changeState(PlayerStates.HURT);
            }
            else this.currentState.handleInput(event);
        }
    }

    /** 
	 * Get the inputs from the keyboard, or Vec2.Zero if nothing is being pressed
	 */
    public get inputDir(): Vec2 {
        let direction = Vec2.ZERO;
		direction.x = (Input.isPressed(HW3Controls.MOVE_LEFT) ? -1 : 0) + (Input.isPressed(HW3Controls.MOVE_RIGHT) ? 1 : 0);
		direction.y = (Input.isJustPressed(HW3Controls.JUMP) ? -1 : 0);
		return direction;
    }
    /** 
     * Gets the direction of the mouse from the player's position as a Vec2
     */
    public get faceDir(): Vec2 { return this.owner.position.dirTo(Input.getGlobalMousePosition()); }

    public update(deltaT: number): void {
        // console.log(this.owner.animation.currentAnimation);
		super.update(deltaT);
        // If the player hits the attack button and the weapon system isn't running, restart the system and fire!
        // wait for animation to reset before we can attack again
        if (Input.isPressed(HW3Controls.ATTACK) && !this.isAttacking) {
            this.owner.animation.play(PlayerAnimations.ATTACK_1);
            this.isAttacking = true;
        }
        if (this.isAttacking && !this.owner.animation.isPlaying(PlayerAnimations.ATTACK_1)) {
            this.isAttacking = false;
            this.emitter.fireEvent(CombatEvents.PLAYER_ATTACK_PHYSICAL, { dmg: this.damage });
        }
        // if (Input.isPressed(HW3Controls.ATTACK)) this.changeState(PlayerStates.COMBAT);

        if (Input.isPressed(HW3Controls.ESC)) {
            this.emitter.fireEvent(HW3Events.GAME_PAUSE);
        }

	}

    public get enemyDamage(): number { return this._enemyDamage; }

    public get velocity(): Vec2 { return this._velocity; }
    public set velocity(velocity: Vec2) { this._velocity = velocity; }

    public get speed(): number { return this._speed; }
    public set speed(speed: number) { this._speed = speed; }

    public get damage(): number { return this._damage; }
    public set damage(damage: number) { this._damage = damage; }

    public get maxHealth(): number { return this._maxHealth; }
    public set maxHealth(maxHealth: number) { 
        this._maxHealth = maxHealth; 
        // When the health changes, fire an event up to the scene.
        this.emitter.fireEvent(HW3Events.HEALTH_CHANGE, {curhp: this.health, maxhp: this.maxHealth});
    }

    public get health(): number { return this._health; }
    public set health(health: number) { 
        this._health = MathUtils.clamp(health, 0, this.maxHealth);
        // When the health changes, fire an event up to the scene.
        this.emitter.fireEvent(HW3Events.HEALTH_CHANGE, {curhp: this.health, maxhp: this.maxHealth});
        // If the health hit 0, change the state of the player
        if (this.health === 0) { 
            this.changeState(PlayerStates.DEAD);
         }
    }
}