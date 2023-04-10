import State from "../../../Wolfie2D/DataTypes/State/State";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import MathUtils from "../../../Wolfie2D/Utils/MathUtils";
import HW3AnimatedSprite from "../../Nodes/HW3AnimatedSprite";
import EnemyController from "../EnemyController";
import Receiver from "../../../Wolfie2D/Events/Receiver";
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
        return this.owner.boundary.containsPoint(this.parent.playerPosition);
    }
}