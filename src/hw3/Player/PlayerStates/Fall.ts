import { PlayerAnimations, PlayerStates } from "../PlayerController";
import PlayerState from "./PlayerState";
import Timer from "../../../Wolfie2D/Timing/Timer";
import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";


export default class Fall extends PlayerState {
    private curHealth: number;
    private fallTimer: Timer;
    private hitSound:string;
    onEnter(options: Record<string, any>): void {
        this.hitSound = this.owner.getScene().getHitSoundKey();
        // If we're falling, the vertical velocity should be >= 0
        this.parent.velocity.y = 0;
        this.fallTimer = new Timer(200)
        this.curHealth = this.parent.health;
        this.owner.animation.play(PlayerAnimations.LAND);
        
    }

    update(deltaT: number): void {
        super.update(deltaT);
        // If the player hits the ground, start idling and check if we should take damage
        if (this.owner.onGround) {
            // this.parent.health -= Math.floor(this.parent.velocity.y / 250);
            
            if(this.curHealth > this.parent.health){
                this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: this.hitSound, loop: false, holdReference: false});
                this.curHealth = this.parent.health;
                if(this.curHealth > 0){
                    this.owner.animation.play(PlayerAnimations.TAKE_DAMAGE);
                }
                
            }
            this.finished(PlayerStates.IDLE)   
            
        } 
        // Otherwise, keep moving
        else {
            // Get the movement direction from the player 
            let dir = this.parent.inputDir;
            // Update the horizontal velocity of the player
            this.parent.velocity.x += dir.x * this.parent.speed/3.5 - 0.3*this.parent.velocity.x;
            // Update the vertical velocity of the player
            this.parent.velocity.y += this.gravity*deltaT;
            // Move the player
            this.owner.move(this.parent.velocity.scaled(deltaT));
        }

    }

    onExit(): Record<string, any> {
        return {};
    }
}