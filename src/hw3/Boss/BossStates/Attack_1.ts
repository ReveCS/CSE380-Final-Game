import { BossStates, BossAnimations } from "../BossController";
import BossState from "./BossState";
import MathUtils from "../../../Wolfie2D/Utils/MathUtils";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import { CombatEvents } from "../../Events/CombatEvents";
export default class Attack_1 extends BossState {
    protected timer:number = 0;
    protected right:boolean = false;
    protected down: boolean = false;
    protected up: boolean = false;
    protected left: boolean = false;
    protected flag: boolean = true;
    protected flag2: boolean = true;
    protected rightFinished = false;
    protected direct:Vec2;
    protected rightToLeft:Vec2;
    protected leftToRight:Vec2;
    
	public onEnter(options: Record<string, any>): void {
        
	}

	public update(deltaT: number): void {
        
		super.update(deltaT);
       
        if(!this.down){
            let dir = this.dirToPlayerRight.clone();
        
            this.parent.velocity.y = dir.y * 700;
            this.parent.velocity.x = dir.x * 700;      
            
            
            this.owner.move(this.parent.velocity.scaled(deltaT)); 
    
    
            if(Math.abs(this.playerRight.y-this.owner.position.y) <= 5){
                this.parent.velocity.y = 0;
                this.parent.velocity.x = 0;
                this.right = true;
                this.down = true;
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
                this.right = false;
                this.rightFinished = true;
                this.leftToRight = new Vec2(this.parent.playerPosition.x+300,this.parent.playerPosition.y)


            }else{
                this.parent.velocity.y = 0;
                this.parent.velocity.x = this.direct.x * 400;
                this.owner.move(this.parent.velocity.scaled(deltaT));
            }
            
        }
        if(this.rightFinished){
            this.timer += 1;
        }
        if(this.timer >= 50){
            if(!this.left){
                if(this.flag2){
                    this.direct = this.owner.position.dirTo(this.leftToRight);
                    this.flag2 = false;
                 }
                
                if(Math.abs(this.leftToRight.x-this.owner.position.x) <= 5){
                    this.parent.velocity.y = 0;
                    this.parent.velocity.x = 0;
                    this.up = true;
                    this.finished(BossStates.IDLE)
                    
                }else{
                    this.parent.velocity.y = 0;
                    this.parent.velocity.x = this.direct.x * 400;
                    this.owner.move(this.parent.velocity.scaled(deltaT));
                }
            }
        }
        if(this.playerInCombatRange()){
            this.emitter.fireEvent(CombatEvents.ENEMY_ATTACK_PHYSICAL, { dmg: this.parent.damage });
        }
        if(this.up){
            let dir = this.dirToSky;
        
            this.parent.velocity.y = dir.y * 700;
            this.parent.velocity.x = dir.x * 700;      
            
            
            this.owner.move(this.parent.velocity.scaled(deltaT)); 
    
    
            if(Math.abs(this.sky.y-this.owner.position.y) <= 5){
                // this.finished(BossStates.IDLE);
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