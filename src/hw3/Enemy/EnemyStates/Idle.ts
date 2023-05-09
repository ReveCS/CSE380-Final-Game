import { EnemyStates, EnemyAnimations } from "../EnemyController";
import EnemyState from "./EnemyState";

export default class Idle extends EnemyState {

	public onEnter(options: Record<string, any>): void {
        if (!this.owner.animation.isPlaying(EnemyAnimations.ATTACK_1)) {
            this.owner.animation.playIfNotAlready(EnemyAnimations.IDLE,true);
        }
        
		this.parent.speed = this.parent.MIN_SPEED;
        this.parent.velocity.x = 0;
        this.parent.velocity.y = 0;
	}

	public update(deltaT: number): void {
		super.update(deltaT);

        // Path to the player if they are in our aggro range
        if (this.playerInRange()) {
            this.finished(EnemyStates.PATHING);
        }
        // return to our spawn if we aren't there
        else if (!this.atSpawn()) {
            this.finished(EnemyStates.RETURNING);
        }
        // We handle hit state in superclass
        // // Otherwise, do nothing (keep idling)
        else {
            // Update the vertical velocity of the Enemy
            this.parent.velocity.y += this.gravity*deltaT;
            // Move the Enemy
            this.owner.move(this.parent.velocity.scaled(deltaT));
        }	
	}

	public onExit(): Record<string, any> {
        if (!this.owner.animation.isPlaying(EnemyAnimations.ATTACK_1)) {
            this.owner.animation.stop();
        }
		return {};
	}
}