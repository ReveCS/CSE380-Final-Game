import { BossStates, BossAnimations } from "../BossController";
import BossState from "./BossState";
import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";
import { HW3PhysicsGroups } from "../../HW3PhysicsGroups";

export default class Idle extends BossState {
    protected timer:number = 0;
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
        let dir = this.dirToSky;
        if(Math.abs(this.sky.y-this.owner.position.y) <= 5){
            this.parent.velocity.y = 0;
            this.parent.velocity.x = 0;
            this.owner.removePhysics();
            this.owner.addPhysics(new AABB(this.owner.position.clone(), this.owner.boundary.getHalfSize().clone()),null, false);
            this.owner.setGroup(HW3PhysicsGroups.BOSS);
            this.owner.collisionShape.halfSize.set(this.owner.collisionShape.halfSize.x,this.owner.collisionShape.halfSize.y);
        }else{
            this.parent.velocity.y = dir.y * this.parent.speed; 
            this.parent.velocity.x = dir.x * this.parent.speed;
            this.owner.move(this.parent.velocity.scaled(deltaT));
        }


        this.timer += 1;
        if(this.timer == 200){
        //    let randomNum = Math.floor(Math.random() *3) + 1;
        let randomNum = 1;
           console.log(randomNum)
           if(randomNum == 1){
                
                this.finished(BossStates.ATTACK_1);
           }
        //    } else if(randomNum == 2){
        //         this.finished(BossStates.ATTACK_2);
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