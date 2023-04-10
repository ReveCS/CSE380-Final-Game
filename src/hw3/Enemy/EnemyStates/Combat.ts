import { EnemyStates, EnemyAnimations } from "../EnemyController";
import EnemyState from "./EnemyState";

export default class Combat extends EnemyState {

	public onEnter(options: Record<string, any>): void {
        this.owner.animation.playIfNotAlready(EnemyAnimations.ATTACK_1);
	}

	public update(deltaT: number): void {
		super.update(deltaT);

        // // Get the direction of the Enemy's movement
		// let dir = this.parent.inputDir;

        // After we're done attacking , go back to idle so we can check what to do next
        if (!this.owner.animation.isPlaying(EnemyAnimations.ATTACK_1)) {
            this.finished(EnemyStates.IDLE);
        }
		
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}