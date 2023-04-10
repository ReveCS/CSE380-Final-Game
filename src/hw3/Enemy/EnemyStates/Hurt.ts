import { EnemyStates, EnemyAnimations } from "../EnemyController";
import EnemyState from "./EnemyState";

export default class Hurt extends EnemyState {

	public onEnter(options: Record<string, any>): void {
        this.parent.health = this.parent.health - this.parent.playerDamage;
        this.owner.animation.playIfNotAlready(EnemyAnimations.TAKE_DAMAGE);
	}

	public update(deltaT: number): void {
		super.update(deltaT);

        // After anim is done , go back to idle so we can check what to do next
        if (!this.owner.animation.isPlaying(EnemyAnimations.TAKE_DAMAGE)) {
            this.finished(EnemyStates.IDLE);
        }
		
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}