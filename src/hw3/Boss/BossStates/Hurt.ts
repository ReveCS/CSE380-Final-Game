import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";
import { BossStates, BossAnimations } from "../BossController";
import BossState from "./BossState";

export default class Hurt extends BossState {
	protected timer:number = 0;
	public onEnter(options: Record<string, any>): void {
		
        this.parent.health = this.parent.health - this.parent.playerDamage;
		if(!this.parent.secondP){
			this.owner.animation.playIfNotAlready(BossAnimations.HURT);
		}else{
			this.owner.animation.playIfNotAlready(BossAnimations.PHASE_2_HURT);
		}
        
	}

	public update(deltaT: number): void {
		super.update(deltaT);

        // After anim is done , go back to idle so we can check what to do next
        if (!this.owner.animation.isPlaying(BossAnimations.HURT) || !this.owner.animation.isPlaying(BossAnimations.PHASE_2_HURT)) {	
            this.finished(BossStates.IDLE);
        }
		
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}