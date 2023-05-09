import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";
import { PlayerStates, PlayerAnimations } from "../PlayerController";
import PlayerState from "./PlayerState";

export default class Hurt extends PlayerState {

	public onEnter(options: Record<string, any>): void {
        this.parent.health = this.parent.health - this.parent.enemyDamage;
		let hurtSound = this.owner.getScene().getplayerHurtSoundKey();
		if(this.parent.health != 0){
			this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: hurtSound, loop: false, holdReference: false});
		}

		let dying = this.owner.animation.isPlaying(PlayerAnimations.DYING);
        let attacking = this.owner.animation.isPlaying(PlayerAnimations.ATTACK_1);
        if(this.parent.health > 0 && !dying && !attacking){
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
		if (!this.owner.animation.isPlaying(PlayerAnimations.ATTACK_1)) {
            this.owner.animation.stop();
        }
		return {};
	}
}