import { EnemyStates, EnemyAnimations } from "../EnemyController";
import EnemyState from "./EnemyState";

export default class Idle extends EnemyState {

	public onEnter(options: Record<string, any>): void {
        this.owner.animation.playIfNotAlready(EnemyAnimations.IDLE,true);
        
		this.parent.speed = this.parent.MIN_SPEED;
        this.parent.velocity.x = 0;
        this.parent.velocity.y = 0;
        console.log("idle")
	}

	public update(deltaT: number): void {
		super.update(deltaT);

        // Attack the player if they are near
        if (this.playerInCombatRange()) {
            this.finished(EnemyStates.COMBAT);
        }
        // If not, path to the player if they are in our aggro range
        else if (this.playerInRange()) {
            this.finished(EnemyStates.PATHING);
        }
        // Change state if we're hit
        else if (false) {
            this.finished(EnemyStates.HURT);
        }
        // we already checked so player must be out of aggro range
        // return to our spawn if we aren't there
        else if (!this.atSpawn()) {
            this.finished(EnemyStates.RETURNING);
        }
        // // Otherwise, do nothing (keep idling)
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