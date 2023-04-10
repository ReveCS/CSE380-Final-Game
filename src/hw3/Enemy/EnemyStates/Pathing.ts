import { EnemyStates, EnemyAnimations } from "../EnemyController";
import EnemyState from "./EnemyState";

export default class Pathing extends EnemyState {

	public onEnter(options: Record<string, any>): void {
        this.owner.animation.playIfNotAlready(EnemyAnimations.WALK,true);
        
		this.parent.speed = this.parent.MIN_SPEED;
        this.parent.velocity.x = 0;
        this.parent.velocity.y = 0;
	}

	public update(deltaT: number): void {
        // Adjust the direction the Enemy is facing
		super.update(deltaT);

        // // Get the direction of the Enemy's movement
		// let dir = this.parent.inputDir;

        // Attack the player if they are near
        if (this.playerInCombatRange()) {
            this.finished(EnemyStates.COMBAT);
        }
        // Stop aggro if the player runs away
        else if (!this.playerInRange()) {
            this.finished(EnemyStates.RETURNING);
        }
        // Change state if we're hit
        else if (false) {
            this.finished(EnemyStates.HURT);
        }
        // Otherwise, do nothing (keep idling)
        else {
            // Update the vertical velocity of the Enemy
            this.parent.velocity.y += this.gravity*deltaT;
            // Move the Enemy
            this.owner.move(this.parent.velocity.scaled(deltaT));
        }
		
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}