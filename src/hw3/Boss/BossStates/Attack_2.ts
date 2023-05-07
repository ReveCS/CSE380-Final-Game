import { BossStates, BossAnimations } from "../BossController";
import BossState from "./BossState";
import MathUtils from "../../../Wolfie2D/Utils/MathUtils";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import { CombatEvents } from "../../Events/CombatEvents";
import { LaserAnimation } from "../../Laser/Laser";
export default class Attack_2 extends BossState {
    protected timer:number = 0;
    protected laserTimer: number = 0;
    protected goToPlayer: boolean = false;
    protected pew: boolean = false;
    protected done: boolean = false;
    protected times: number;
    
    
	public onEnter(options: Record<string, any>): void {
        this.parent.isInvincible = true;
        
	}

	public update(deltaT: number): void {
        
		super.update(deltaT);
        if(!this.parent.secondP){
            if(!this.goToPlayer){
                    let dir = this.owner.position.dirTo(new Vec2(this.parent.playerPosition.x, this.parent.playerPosition.y-175))
                    this.parent.velocity.y = 0
                    this.parent.velocity.x = dir.x * 700;
                    
                
                    this.owner.move(this.parent.velocity.scaled(deltaT)); 
    
            
                    if(Math.abs(this.parent.playerPosition.x-this.owner.position.x) <= 5){
                        this.parent.velocity.y = 0;
                        this.parent.velocity.x = 0;
                        this.owner.animation.play(BossAnimations.ATTACK_2);
                        
                        this.bossLaser.visible = true;
                        this.bossLaser.alpha = 0.5;
                        this.goToPlayer = true;
                    }
    
                }else{
                    if(this.timer >= 1){
                        this.bossLaser.animation.queue(LaserAnimation.FIRE);
                        this.bossLaser.alpha = 1;
                        
                        
                        this.pew = true;
                        
                        
                    }else{
                        this.parent.laserPosition = new Vec2(this.owner.position.x, this.owner.position.y+105)
                        this.bossLaser.animation.play(LaserAnimation.INDICATOR);
                    }
                    this.timer+=1;
                }
                if(this.pew){
                    if(this.laserTimer == 135){
                        this.bossLaser.animation.stop();
                        this.bossLaser.visible = false;
                        this.done = true;                
                    }
                    this.laserTimer += 1;
                }
            
                
                if(this.done){
                    this.timer = 0;
                    this.laserTimer = 0;
                    this.goToPlayer = false;
                    this.pew = false; 
                    this.done = false;
                    this.times = 0;
                    this.finished(BossStates.IDLE);
                }
        }else{
            if(this.times < 3){
                if(!this.goToPlayer){
                    let dir = this.owner.position.dirTo(new Vec2(this.parent.playerPosition.x, this.parent.playerPosition.y-175))
                    this.parent.velocity.y = 0
                    this.parent.velocity.x = dir.x * 700;
                    
                
                    this.owner.move(this.parent.velocity.scaled(deltaT)); 
    
            
                    if(Math.abs(this.parent.playerPosition.x-this.owner.position.x) <= 5){
                        this.parent.velocity.y = 0;
                        this.parent.velocity.x = 0;
                        this.owner.animation.play(BossAnimations.PHASE_2_ATTACK_2);
                        
                        this.bossLaser.visible = true;
                        this.bossLaser.alpha = 0.5;
                        this.goToPlayer = true;
                    }
    
                }else{
                    if(this.timer >= 1){
                        this.bossLaser.animation.queue(LaserAnimation.FIRE);
                        this.bossLaser.alpha = 1;
                        
                        
                        this.pew = true;
                        
                        
                    }else{
                        this.parent.laserPosition = new Vec2(this.owner.position.x, this.owner.position.y+105)
                        this.bossLaser.animation.play(LaserAnimation.INDICATOR);
                    }
                    this.timer+=1;
                }
                if(this.pew){
                    if(this.laserTimer == 135){
                        this.bossLaser.animation.stop();
                        this.bossLaser.visible = false;
                        this.done = true;                
                    }
                    this.laserTimer += 1;
                }
            
               
                if(this.done){
                    this.timer = 0;
                    this.laserTimer = 0;
                    this.goToPlayer = false;
                    this.pew = false; 
                    this.done = false;
                    this.times += 1;
                }
            }else{
                this.times = 0;
                this.finished(BossStates.IDLE);
            }
        }
        if(this.playerInLaserRange() && this.bossLaser.visible && this.bossLaser.animation.isPlaying(LaserAnimation.FIRE)){
            if(!this.parent.secondP){
                this.emitter.fireEvent(CombatEvents.ENEMY_ATTACK_PHYSICAL, { dmg: this.parent.damage });
            }else{
                this.emitter.fireEvent(CombatEvents.ENEMY_ATTACK_PHYSICAL, { dmg: 2 });
            }
        }
        
        
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}