import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
// import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";

import Idle from "./EnemyStates/Idle";
import Pathing from "./EnemyStates/Pathing";
import Returning from "./EnemyStates/Returning";
import Hurt from "./EnemyStates/Hurt";
import Dead from "./EnemyStates/Dead";
import Combat from "./EnemyStates/Combat";

// // import PlayerWeapon from "./EnemyWeapon";
// import Input from "../../Wolfie2D/Input/Input";

import { HW3Controls } from "../HW3Controls";
import HW3AnimatedSprite from "../Nodes/HW3AnimatedSprite";
import MathUtils from "../../Wolfie2D/Utils/MathUtils";
import { HW3Events } from "../HW3Events";

/**
 * Animation keys for any enemy spritesheet
 */
export const EnemyAnimations = {
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
 * Tween animations
 */
export const EnemyTweens = {
    // FLIP: "FLIP",
    // DEATH: "DEATH"
} as const

/**
 * Keys for the states the EnemyController can be in.
 */
export const EnemyStates = {
    IDLE: "IDLE",
    PATHING: "PATHING",
    RETURNING: "RETURNING",
    HURT: "HURT",
    DEAD: "DEAD",
    COMBAT: "COMBAT",
} as const

/**
 * The controller that controls the enemy.
 */
export default class EnemyController extends StateMachineAI {
    public readonly MAX_SPEED: number = 300;
    public readonly MIN_SPEED: number = 200;

    /** Health and max health for the enemy */
    protected _health: number;
    protected _maxHealth: number;

    /** The enemy's game node */
    protected owner: HW3AnimatedSprite;

    protected _velocity: Vec2;
	protected _speed: number;

    protected _aggroRadius: number;
    protected _spawn: Vec2;
    private _player: HW3AnimatedSprite;

    // protected tilemap: OrthogonalTilemap;
    // protected cannon: Sprite;
    // protected weapon: EnemyWeapon;

    
    public initializeAI(owner: HW3AnimatedSprite, options: Record<string, any>){
        this.owner = owner;

        // this.weapon = options.weaponSystem;

        // this.tilemap = this.owner.getScene().getTilemap(options.tilemap) as OrthogonalTilemap;
        this.speed = 200;
        this.velocity = Vec2.ZERO;

        this.health = 5
        this.maxHealth = 5;

        this.aggroRadius = options.radius;
        this.spawn = options.spawn;
        this._player = options.player;

        // Add the different states the enemy can be in to the EnemyController 
		this.addState(EnemyStates.IDLE, new Idle(this, this.owner));
        this.addState(EnemyStates.PATHING, new Pathing(this, this.owner));
        this.addState(EnemyStates.RETURNING, new Returning(this, this.owner));
        this.addState(EnemyStates.HURT, new Hurt(this, this.owner));
        this.addState(EnemyStates.DEAD, new Dead(this, this.owner));
        this.addState(EnemyStates.COMBAT, new Combat(this, this.owner));
        
        // Start the enemy in the Idle state
        this.initialize(EnemyStates.IDLE);

        this.receiver.subscribe(HW3Events.PLAYER_ATTACK);
    }

    // Override
    handleEvent(event: GameEvent): void {
        if(this.active){
            if (event.type === HW3Events.PLAYER_ATTACK) this.changeState(EnemyStates.HURT);
            else this.currentState.handleInput(event);
        }
    }

    public update(deltaT: number): void {
		super.update(deltaT);
	}

    public get aggroRadius(): number { return this._aggroRadius; }
    public set aggroRadius(radius: number) {this._aggroRadius = radius; }

    public get spawn(): Vec2 { return this._spawn; }
    public set spawn(spawn: Vec2) {this._spawn = spawn; } 

    public get playerPosition(): Vec2 { return this._player.position; }

    public get velocity(): Vec2 { return this._velocity; }
    public set velocity(velocity: Vec2) { this._velocity = velocity; }

    public get speed(): number { return this._speed; }
    public set speed(speed: number) { this._speed = speed; }

    public get maxHealth(): number { return this._maxHealth; }
    public set maxHealth(maxHealth: number) { 
        this._maxHealth = maxHealth; 
        // When the health changes, fire an event up to the scene.
        // this.emitter.fireEvent(HW3Events.HEALTH_CHANGE, {curhp: this.health, maxhp: this.maxHealth});
    }

    public get health(): number { return this._health; }
    public set health(health: number) { 
        this._health = MathUtils.clamp(health, 0, this.maxHealth);
        // When the health changes, fire an event up to the scene.
        // this.emitter.fireEvent(HW3Events.HEALTH_CHANGE, {curhp: this.health, maxhp: this.maxHealth});
        // If the health hit 0, change the state of the player
        if (this.health === 0) { 
            this.changeState(EnemyStates.DEAD);
         }
    }
}