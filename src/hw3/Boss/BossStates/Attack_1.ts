import { BossStates, BossAnimations } from "../BossController";
import BossState from "./BossState";
import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";
import MathUtils from "../../../Wolfie2D/Utils/MathUtils";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
export default class Attack_1 extends BossState {
    protected timer:number = 0;
    protected right:boolean = false;
    protected flag: boolean = true;
    protected direct:Vec2;
    protected rightToLeft:Vec2;
    
	public onEnter(options: Record<string, any>): void {
        
	}

	public update(deltaT: number): void {
        
		super.update(deltaT);
       if(!this.right){
        let dir = this.dirToPlayerRight.clone();
        
        this.parent.velocity.y = dir.y * 500;
        this.parent.velocity.x = dir.x * 500;      
		
        this.owner.removePhysics();
        this.owner.addPhysics(new AABB(this.owner.position.clone()));
        this.owner.move(this.parent.velocity.scaled(deltaT)); 


        if(Math.abs(this.playerRight.y-this.owner.position.y) <= 5){
            this.parent.velocity.y = 0;
            this.parent.velocity.x = 0;
            this.right = true;
        }
       }
        //     // this.owner.removePhysics();
        //     // this.owner.addPhysics(new AABB(this.owner.position.clone(), this.owner.boundary.getHalfSize().clone()),null, false);
        //     // this.owner.collisionShape.halfSize.set(this.owner.collisionShape.halfSize.x,this.owner.collisionShape.halfSize.y);
        // }else{
        //     // this.parent.velocity.y = dir.y * this.parent.speed; 
        //     // this.parent.velocity.x = dir.x * this.parent.speed;
        //     // this.owner.move(this.parent.velocity.scaled(deltaT));
        
        if(this.right){
            if(this.dirToPlayer.x !== 0){
                this.owner.invertX = MathUtils.sign(this.dirToPlayer.x) < 0;
            }
            if(!this.owner.animation.isPlaying(BossAnimations.ATTACK_1)){
                if(!this.owner.animation.isPlaying(BossAnimations.ATTACK_2)  && this.parent.health> 0 && !this.owner.animation.isPlaying(BossAnimations.HURT)){
                     this.owner.animation.play(BossAnimations.ATTACK_1)
                }
             }
             if(this.flag){
                this.rightToLeft = new Vec2(this.parent.playerPosition.x-300,this.parent.playerPosition.y)
                this.direct = this.owner.position.dirTo(this.rightToLeft);
                this.flag = false;
             }
            
            
            if(Math.abs(this.rightToLeft.x-this.owner.position.x) <= 5){
                this.parent.velocity.y = 0;
                this.parent.velocity.x = 0;
            }else{
                this.parent.velocity.y = this.direct.y * 400;
                this.parent.velocity.x = this.direct.x * 400;
                this.owner.move(this.parent.velocity.scaled(deltaT));
            }


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