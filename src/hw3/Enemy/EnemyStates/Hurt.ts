import { EnemyStates, EnemyAnimations } from "../EnemyController";
import EnemyState from "./EnemyState";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";

export default class Hurt extends EnemyState {

	public onEnter(options: Record<string, any>): void {
        this.owner.animation.playIfNotAlready(EnemyAnimations.TAKE_DAMAGE);
        console.log("hurt")
	}

	public update(deltaT: number): void {
		super.update(deltaT);

        // If we take lethal damage we die
        if (false) {
            this.finished(EnemyStates.DEAD);
        }
        // After anim is done , go back to idle so we can check what to do next
        else if (!this.owner.animation.isPlaying(EnemyAnimations.TAKE_DAMAGE)) {
            this.finished(EnemyStates.IDLE);
        }
		
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}