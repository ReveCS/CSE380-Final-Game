import { PlayerStates, PlayerAnimations } from "../PlayerController";
import PlayerState from "./PlayerState";

export default class Hurt extends PlayerState {

	public onEnter(options: Record<string, any>): void {
        this.parent.health = this.parent.health - this.parent.enemyDamage;
        if(!this.owner.animation.isPlaying(PlayerAnimations.DYING)){
			this.owner.animation.play(PlayerAnimations.TAKE_DAMAGE);
		}
	}

	public update(deltaT: number): void {
		super.update(deltaT);

        // After anim is done , go back to idle so we can check what to do next
        if (!this.owner.animation.isPlaying(PlayerAnimations.TAKE_DAMAGE)) {
            this.finished(PlayerStates.IDLE);
        }
		
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}