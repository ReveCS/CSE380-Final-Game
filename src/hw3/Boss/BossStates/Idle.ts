import { BossStates, BossAnimations } from "../BossController";
import BossState from "./BossState";

export default class Idle extends BossState {

	public onEnter(options: Record<string, any>): void {
        this.owner.animation.queue(BossAnimations.IDLE,true);
        
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