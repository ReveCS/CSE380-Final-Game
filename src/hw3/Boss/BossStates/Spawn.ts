import { BossStates, BossAnimations } from "../BossController";
import BossState from "./BossState";

export default class Spawn extends BossState {

	public onEnter(options: Record<string, any>): void {
        this.owner.animation.queue(BossAnimations.SPAWN);
        
		
	}

	public update(deltaT: number): void {
        if(!this.owner.animation.isPlaying(BossAnimations.SPAWN)){
           this.owner.animation.play(BossAnimations.SPAWN)
           
         }
        
         super.update(deltaT);
         

       
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}