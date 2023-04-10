import { EnemyStates, EnemyAnimations } from "../EnemyController";
import EnemyState from "./EnemyState";

export default class Combat extends EnemyState {

	public onEnter(options: Record<string, any>): void {
        this.owner.animation.playIfNotAlready(EnemyAnimations.ATTACK_1);
        
		this.parent.speed = this.parent.MIN_SPEED;
        this.parent.velocity.x = 0;
        this.parent.velocity.y = 0;
	}

	public update(deltaT: number): void {
        // Adjust the direction the Enemy is facing
		super.update(deltaT);

        // // Get the direction of the Enemy's movement
		// let dir = this.parent.inputDir;

        // After we attack , go back to idle so we can check what to do next
        this.finished(EnemyStates.IDLE);
		
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}