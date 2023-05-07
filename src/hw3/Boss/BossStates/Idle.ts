import { BossStates, BossAnimations } from "../BossController";
import BossState from "./BossState";

export default class Idle extends BossState {
    protected timer:number = 0;
    protected index: number = 0;
    protected spawn: boolean = true;
    protected invinciblityTimer:number = 0;
    protected phase2Timer: number = 0;
    	public onEnter(options: Record<string, any>): void {        
        this.owner.animation.queue(BossAnimations.IDLE);        
		this.parent.speed = this.parent.MIN_SPEED;
        this.parent.velocity.x = 0;
        this.parent.velocity.y = 0;

	}

	public update(deltaT: number): void {
        if(!this.owner.animation.isPlaying(BossAnimations.IDLE)){
            if(!this.owner.animation.isPlaying(BossAnimations.SPAWN) && !this.owner.animation.isPlaying(BossAnimations.ATTACK_2)  && this.parent.health> 0 && !this.owner.animation.isPlaying(BossAnimations.HURT) && !this.owner.animation.isPlaying(BossAnimations.ATTACK_1)){
                 this.owner.animation.play(BossAnimations.IDLE)
            }
         }
		super.update(deltaT);
        if(this.spawn){
            let dir = this.dirToSky;
            if(Math.abs(this.sky.y-this.owner.position.y) <= 5){
                this.parent.velocity.y = 0;
                this.parent.velocity.x = 0;
                this.spawn = false;
            }else{
                this.parent.velocity.y = dir.y * this.parent.speed; 
                this.parent.velocity.x = dir.x * this.parent.speed;
                this.owner.move(this.parent.velocity.scaled(deltaT));
            }
        }else{
            let dir = this.dirToAbovePlayer;
            if(Math.abs(this.sky.y-this.owner.position.y) <= 5){
                this.parent.velocity.y = 0;
                this.parent.velocity.x = 0;
            }else{
                this.parent.velocity.y = dir.y * 350; 
                this.parent.velocity.x = dir.x * 350;
                this.owner.move(this.parent.velocity.scaled(deltaT));
            }
        }
        if(this.parent.isInvincible){
            this.invinciblityTimer += 1;
        }
        if(this.invinciblityTimer == 25){
            this.parent.isInvincible = false;
            this.invinciblityTimer = 0;
        }

        this.timer += 1;
        if(!this.parent.secondP){
            if(this.timer == 200){
                let attackArray = [1,1,2,1,3];
                let nextAttack = attackArray[this.index];
                if(nextAttack == 1){
                    this.finished(BossStates.ATTACK_1);
                    this.index = (this.index + 1) % attackArray.length;
                    this.timer = 0;
                }else if(nextAttack == 2){
                    this.finished(BossStates.ATTACK_2);
                    this.index = (this.index + 1) % attackArray.length;
                    this.timer = 0;
                }else if(nextAttack == 3){
                    this.finished(BossStates.ATTACK_3);
                    this.index = (this.index + 1) % attackArray.length;
                    this.timer = 0;
                }
            }
        }else{
            if(this.phase2Timer >= 200){
                if(this.timer >= 150){
                    let attackArray = [2,1,3,2,1];
                    let nextAttack = attackArray[this.index];
                    if(nextAttack == 1){
                        this.finished(BossStates.ATTACK_1);
                        this.index = (this.index + 1) % attackArray.length;
                        this.timer = 0;
                    }else if(nextAttack == 2){
                        this.finished(BossStates.ATTACK_2);
                        this.index = (this.index + 1) % attackArray.length;
                        this.timer = 0;
                    }else if(nextAttack == 3){
                        this.finished(BossStates.ATTACK_3);
                        this.index = (this.index + 1) % attackArray.length;
                        this.timer = 0;
                    }
                }
                
            }else{
                this.parent.isInvincible = true;
            }
            if(this.phase2Timer >= 100){
                if(this.parent.health <= this.parent.maxHealth*0.8){
                    this.parent.health += 0.1;
                }
            }
            this.phase2Timer+=1;
        }

        
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}