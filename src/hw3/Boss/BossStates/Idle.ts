import { BossStates, BossAnimations } from "../BossController";
import BossState from "./BossState";

export default class Idle extends BossState {
    protected timer:number = 0;
    protected index: number = 0;
    protected spawn: boolean = true;
    protected invinciblityTimer:number = 0;
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
        if(this.timer == 200){
            let attackArray = [1,1,2,1,3];
            // let nextAttack = attackArray[this.index];
            let nextAttack = 2;
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
        
        //    } else if(randomNum == 3){
        //         //this.finished(BossStates.ATTACK_3);
        //    }
        }

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