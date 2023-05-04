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
    protected up: boolean = false;
    
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
       
        if(this.playerInLaserRange() && this.bossLaser.visible && this.bossLaser.animation.isPlaying(LaserAnimation.FIRE)){
            this.emitter.fireEvent(CombatEvents.ENEMY_ATTACK_PHYSICAL, { dmg: this.parent.damage });
        }
        if(this.done){
            this.timer = 0;
            this.laserTimer = 0;
            this.goToPlayer = false;
            this.pew = false; 
            this.done = false;
            this.finished(BossStates.IDLE);
        }
        // if(this.right){
        //     if(this.dirToPlayer.x !== 0){
        //         this.owner.invertX = MathUtils.sign(this.dirToPlayer.x) < 0;
        //     }
        //     if(!this.owner.animation.isPlaying(BossAnimations.ATTACK_1)){
        //         if(!this.owner.animation.isPlaying(BossAnimations.ATTACK_2)  && this.parent.health> 0 && !this.owner.animation.isPlaying(BossAnimations.HURT)){
        //              this.owner.animation.play(BossAnimations.ATTACK_1)
        //         }
        //      }
        //      if(this.flag){
        //         this.rightToLeft = new Vec2(this.parent.playerPosition.x-300,this.parent.playerPosition.y)
        //         this.direct = this.owner.position.dirTo(this.rightToLeft);
        //         this.flag = false;
        //      }
            
            
        //     if(Math.abs(this.rightToLeft.x-this.owner.position.x) <= 5){
        //         this.parent.velocity.y = 0;
        //         this.parent.velocity.x = 0;
        //         this.right = false;
        //         this.rightFinished = true;
        //         this.leftToRight = new Vec2(this.parent.playerPosition.x+300,this.parent.playerPosition.y)


        //     }else{
        //         this.parent.velocity.y = 0;
        //         this.parent.velocity.x = this.direct.x * 400;
        //         this.owner.move(this.parent.velocity.scaled(deltaT));
        //     }
            
        // }
        // if(this.rightFinished){
        //     this.timer += 1;
        // }
        // if(this.timer >= 50){
        //     if(!this.left){
        //         if(this.flag2){
        //             this.direct = this.owner.position.dirTo(this.leftToRight);
        //             this.flag2 = false;
        //          }
                
        //         if(Math.abs(this.leftToRight.x-this.owner.position.x) <= 5){
        //             this.parent.velocity.y = 0;
        //             this.parent.velocity.x = 0;
        //             this.up = true;
        //             this.finished(BossStates.IDLE)
                    
        //         }else{
        //             this.parent.velocity.y = 0;
        //             this.parent.velocity.x = this.direct.x * 400;
        //             this.owner.move(this.parent.velocity.scaled(deltaT));
        //         }
        //     }
        // }
        // if(this.playerInCombatRange()){
        //     this.emitter.fireEvent(CombatEvents.ENEMY_ATTACK_PHYSICAL, { dmg: this.parent.damage });
        // }
        // if(this.up){
        //     let dir = this.dirToSky;
        
        //     this.parent.velocity.y = dir.y * 700;
        //     this.parent.velocity.x = dir.x * 700;      
            
            
        //     this.owner.move(this.parent.velocity.scaled(deltaT)); 
    
    
        //     if(Math.abs(this.sky.y-this.owner.position.y) <= 5){
        //         // this.finished(BossStates.IDLE);
        //     }

        // }

        // // Attack the player if they are near
        // if (this.playerInCombatRange()) {
        //     this.finished(BossStates.COMBAT);
        // }
        // If not, path to the player if they are in our aggro range
        // else if (this.playerInRange()) {
        //     this.finished(EnemyStates.PATHING);
        // }
        // we already checked so player must be out of aggro range
        // return to our spawn if we aren't there
        // else if (!this.atSpawn()) {
        //     this.finished(EnemyStates.RETURNING);
        // }
        // We handle hit state in superclass
        // // Otherwise, do nothing (keep idling)
        // else {
        //     // Update the vertical velocity of the Enemy
        //     this.parent.velocity.y += this.gravity*deltaT;
        //     // Move the Enemy
        //     this.owner.move(this.parent.velocity.scaled(deltaT));
        // }	
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}