import { BossStates, BossAnimations } from "../BossController";
import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";
import BossState from "./BossState";
export default class Phase_2 extends BossState {
    protected count:number = 0;
	public onEnter(options: Record<string, any>): void {
        let spawnAudio = this.owner.getScene().getSpawnAudioKey();
        this.owner.animation.queue(BossAnimations.PHASE_2);
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: spawnAudio, loop: false, holdReference: false});
        
        
		
	}

	public update(deltaT: number): void {
        if(!this.owner.animation.isPlaying(BossAnimations.PHASE_2)){
            
           this.owner.animation.play(BossAnimations.PHASE_2)
           
         }
        if(this.count == 125){
            this.parent.isInvincible = false;
            this.finished(BossStates.IDLE)
            
        }
        super.update(deltaT);
        this.count += 1;
         

       
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}