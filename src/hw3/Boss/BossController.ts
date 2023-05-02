import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
// import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";

import Idle from "./BossStates/Idle";
import Statue from "./BossStates/Statue";
import Spawn from "./BossStates/Spawn";
// import Returning from "./EnemyStates/Returning";
// import Hurt from "./EnemyStates/Hurt";
// import Dead from "./EnemyStates/Dead";
// import Combat from "./EnemyStates/Combat";

// import Input from "../../Wolfie2D/Input/Input";

import HW3AnimatedSprite from "../Nodes/HW3AnimatedSprite";
import MathUtils from "../../Wolfie2D/Utils/MathUtils";
import Attack_1 from "./BossStates/Attack_1";
import Attack_2 from "./BossStates/Attack_2";
// import { CombatEvents } from "../Events/CombatEvents";

/**
 * Animation keys for any enemy spritesheet
 */
export const BossAnimations = {
    IDLE: "IDLE",
    ATTACK_1: "ATTACK_1",
    ATTACK_2: "ATTACK_2",
    HURT: "HURT",
    DYING: "DYING",
    DEATH: "DEATH",
    STATUE: "STATUE",
    SPAWN: "SPAWN"
    
} as const

/**
 

/**
 * Keys for the states the EnemyController can be in.
 */
export const BossStates = {
    IDLE: "IDLE",
    ATTACK_1: "ATTACK_1",
    ATTACK_2: "ATTACK_2",
    HURT: "HURT",
    STATUE:"STATUE",
    DEATH: "DEATH",
    SPAWN: "SPAWN",
} as const

/**
 * The controller that controls the enemy.
 */
export default class BossController extends StateMachineAI {
    public readonly MAX_SPEED: number = 300;
    public readonly MIN_SPEED: number = 200;

    /** Health and max health for the enemy */
    protected _health: number;
    protected _maxHealth: number;

    protected _damage: number;

    /** The enemy's game node */
    protected owner: HW3AnimatedSprite;
    protected bossLaser: HW3AnimatedSprite;

    protected _velocity: Vec2;
	protected _speed: number;

    protected _aggroRadius: number;
    protected _spawn: Vec2;
    protected _player: HW3AnimatedSprite;
    protected _playerDamage: number;


    // protected tilemap: OrthogonalTilemap;
    // protected cannon: Sprite;
    // protected weapon: EnemyWeapon;

    
    public initializeAI(owner: HW3AnimatedSprite, options: Record<string, any>){
        this.owner = owner;
        this.bossLaser = options.laser;
        // this.weapon = options.weaponSystem;

        // this.tilemap = this.owner.getScene().getTilemap(options.tilemap) as OrthogonalTilemap;
        this.speed = 200;
        this.velocity = Vec2.ZERO;

        this.health = 5
        this.maxHealth = 5;

        this._damage = 1;

        this._playerDamage = 1;

        this.aggroRadius = options.radius;
        this.spawn = options.spawn;
        this._player = options.player;
        // Add the different states the enemy can be in to the EnemyController 
		this.addState(BossStates.IDLE, new Idle(this, this.owner,this.bossLaser));
        this.addState(BossStates.ATTACK_1, new Attack_1(this, this.owner,this.bossLaser));
        this.addState(BossStates.ATTACK_2, new Attack_2(this, this.owner,this.bossLaser));
        // this.addState(BossStates.HURT, new Hurt(this, this.owner));
        // this.addState(BossStates.DEATH, new Dead(this, this.owner));
        this.addState(BossStates.SPAWN, new Spawn(this,this.owner,this.bossLaser))
        this.addState(BossStates.STATUE, new Statue(this, this.owner,this.bossLaser));
        
        // Start the enemy in the Idle state
        this.initialize(BossStates.STATUE);

        // this.receiver.subscribe(CombatEvents.PLAYER_ATTACK_PHYSICAL);
    }

    // Override
    handleEvent(event: GameEvent): void {
        // if(this.active){
        //     if (event.type === CombatEvents.PLAYER_ATTACK_PHYSICAL) {
        //         // make sure we are in the range of player's attack
        //         if (this._player.boundary.containsPoint(this.owner.position)) {
        //             this._playerDamage = event.data.get("dmg");
        //             // this.changeState(EnemyStates.HURT);
        //         }
        //     }
        //     else this.currentState.handleInput(event);
        // }
    }

    public update(deltaT: number): void {
		super.update(deltaT);
	}

    public get aggroRadius(): number { return this._aggroRadius; }
    public set aggroRadius(radius: number) {this._aggroRadius = radius; }

    public get spawn(): Vec2 { return this._spawn; }
    public set spawn(spawn: Vec2) {this._spawn = spawn; } 

    public get playerPosition(): Vec2 { return this._player.position; }
    public get playerDamage(): number { return this._playerDamage }

    public get laserPosition(): Vec2 { return this.bossLaser.position}
    public set laserPosition(position: Vec2){ this.bossLaser.position = position}
    public get velocity(): Vec2 { return this._velocity; }
    public set velocity(velocity: Vec2) { this._velocity = velocity; }

    public get speed(): number { return this._speed; }
    public set speed(speed: number) { this._speed = speed; }

    public get damage(): number { return this._damage; }
    public set damage(damage: number) { this._damage = damage }

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
            this.changeState(BossAnimations.DYING);
            //this.emitter.fireEvent();
         }
    }
}