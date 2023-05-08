import State from "../../../Wolfie2D/DataTypes/State/State";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import MathUtils from "../../../Wolfie2D/Utils/MathUtils";
import HW3AnimatedSprite from "../../Nodes/HW3AnimatedSprite";
import EnemyController, { EnemyStates } from "../EnemyController";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";

/**
 * An abstract state for the EnemyController 
 */
export default abstract class EnemyState extends State {

    protected parent: EnemyController;
	protected owner: HW3AnimatedSprite;
	protected gravity: number;
    protected aggroRadius: number;
    protected dirToPlayer: Vec2;

	public constructor(parent: EnemyController, owner: HW3AnimatedSprite){
		super(parent);
		this.owner = owner;
        this.gravity = 500;
        this.aggroRadius = this.parent.aggroRadius;
	}

    public abstract onEnter(options: Record<string, any>): void;

    /**
     * Handle game events from the parent.
     * @param event the game event
     */
	public handleInput(event: GameEvent): void {
        switch(event.type) {
            // Default - throw an error
            default: {
                throw new Error(`Unhandled event in EnemyState of type ${event.type}`);
            }
        }
	}

	public update(deltaT: number): void {
        // This updates the direction the Player is in (left or right)
        this.dirToPlayer = this.owner.position.dirTo(this.parent.playerPosition);
        // make sure were facing the player
        if(this.dirToPlayer.x !== 0){
            this.owner.invertX = MathUtils.sign(this.dirToPlayer.x) < 0;
        }
    }

    public abstract onExit(): Record<string, any>;

    // returns whether a player is inside our aggro range or not
    protected playerInRange(): Boolean {
        let sqPlayerDist = this.parent.spawn.distanceSqTo(this.parent.playerPosition);
        let factor = 20; // cause sqDist is crazy large
        let sqAggroRadius = this.aggroRadius * factor * this.aggroRadius * factor;
        return sqPlayerDist <= sqAggroRadius;
    }

    // returns if the player is in range to be attacked
    protected playerInCombatRange(): Boolean {
        // return this.owner.boundary.containsPoint(this.parent.playerPosition);
        return this.parent.playerBoundary.containsPoint(this.owner.position);
    }

    // returns if we are at our spawn
    protected atSpawn(): Boolean {
        let threshold = 2.6; // 2.5 but do 2.6 for rounding errors
        return this.owner.position.distanceSqTo(this.parent.spawn) < threshold * threshold;
    }

    // returns if player is on top of enemy
    protected playerOnTop(): boolean {
        // if player is on top, its AABB will be inside enemy's AABB
        let check1 = this.owner.boundary.overlaps(this.parent.playerBoundary);
        // player is above if bottom of their AABB is above top of enemy AABB
        // add some error correction cause player AABB isnt perfect
        let check2 = this.parent.playerBoundary.bottom < this.owner.boundary.top + 10;

        return check1 && check2;
    }
}