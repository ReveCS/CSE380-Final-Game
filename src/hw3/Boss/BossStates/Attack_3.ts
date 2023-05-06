import { BossStates, BossAnimations } from "../BossController";
import BossState from "./BossState";
import MathUtils from "../../../Wolfie2D/Utils/MathUtils";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import { CombatEvents } from "../../Events/CombatEvents";
import { SpikeAnimation } from "../../Spikes/Spikes";
export default class Attack_3 extends BossState {
    protected timer:number = 0;
    protected spikeTimer: number = 0;
    protected retractTimer: number = 0;
    protected goToPlayer: boolean = false;
    protected prick: boolean = false;
    protected done: boolean = false;
    
	public onEnter(options: Record<string, any>): void {
        this.parent.isInvincible = true;
        

	}

	public update(deltaT: number): void {
        
		super.update(deltaT);
       
        if(!this.goToPlayer){
            let dir = this.owner.position.dirTo(new Vec2(this.parent.playerPosition.x, this.parent.playerPosition.y-175))
            this.parent.velocity.y = 0
            this.parent.velocity.x = dir.x * 700;
            
           
            this.owner.move(this.parent.velocity.scaled(deltaT)); 

    
            if(Math.abs(this.parent.playerPosition.x-this.owner.position.x) <= 5){
                this.parent.velocity.y = 0;
                this.parent.velocity.x = 0;
                this.owner.animation.play(BossAnimations.ATTACK_3);
                this.spikes.position = new Vec2(this.parent.playerPosition.clone().x-200, this.parent.playerPosition.clone().y);
                this.spikes2.position = new Vec2(this.parent.playerPosition.clone().x+200, this.parent.playerPosition.clone().y);
                this.parent.indicatorAttack3_1.position = this.spikes.position;
                this.parent.indicatorAttack3_2.position = this.spikes2.position;
                this.parent.indicatorAttack3_1.visible = true;
                this.parent.indicatorAttack3_2.visible = true;
                this.goToPlayer = true;
                
            }
            

        }else{
            if(this.prick){
                this.spikes.animation.queue(SpikeAnimation.FINISHED);
                this.spikes2.animation.queue(SpikeAnimation.FINISHED);
                if(this.spikeTimer >= 100){
                    this.spikes.animation.queue(SpikeAnimation.RETRACT);
                    this.spikes2.animation.queue(SpikeAnimation.RETRACT);
                    if(this.retractTimer >=50){
                        this.spikes.animation.stop();
                        this.spikes2.animation.stop();
                        this.spikes.visible = false;
                        this.spikes2.visible = false;
                        this.done = true;
                    }
                    this.retractTimer += 1;
                }
                
                this.spikeTimer += 1;
                
            }else{
                if(this.timer >= 75){
                    this.spikes.visible = true;
                    this.spikes2.visible = true;
                    this.parent.indicatorAttack3_1.visible = false;
                    this.parent.indicatorAttack3_2.visible = false;
                    if(!this.spikes.animation.isPlaying(SpikeAnimation.ATTACK) || !this.spikes.animation.isPlaying(SpikeAnimation.ATTACK)){
                        this.spikes.animation.play(SpikeAnimation.ATTACK);
                        this.spikes2.animation.play(SpikeAnimation.ATTACK);
                    }
                    this.prick = true;
                }
                this.timer += 1;
            }
            
            
        }
        
        
        if(this.playerInSpikeRange() && this.spikes.visible && this.spikes2.visible){
            this.emitter.fireEvent(CombatEvents.ENEMY_ATTACK_PHYSICAL, { dmg: this.parent.damage });
        }
        	
        if(this.done){
            this.timer = 0;
            this.spikeTimer = 0;
            this.goToPlayer = false;
            this.done = false;
            this.prick = false;
            this.finished(BossStates.IDLE);
        }
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}