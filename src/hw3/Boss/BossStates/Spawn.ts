import { BossStates, BossAnimations } from "../BossController";
import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";
import BossState from "./BossState";

export default class Spawn extends BossState {
    protected count:number = 0;
	public onEnter(options: Record<string, any>): void {
        let spawnAudio = this.owner.getScene().getSpawnAudioKey();
        this.owner.animation.queue(BossAnimations.SPAWN);
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: spawnAudio, loop: false, holdReference: false});
        
		
	}

	public update(deltaT: number): void {
        if(!this.owner.animation.isPlaying(BossAnimations.SPAWN)){
            
           this.owner.animation.play(BossAnimations.SPAWN)
           
         }
        if(this.count == 220){
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