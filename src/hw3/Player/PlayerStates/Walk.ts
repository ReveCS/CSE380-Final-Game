import { PlayerStates, PlayerAnimations } from "../PlayerController";
import Input from "../../../Wolfie2D/Input/Input";
import { HW3Controls } from "../../HW3Controls";
import PlayerState from "./PlayerState";

export default class Walk extends PlayerState {

	onEnter(options: Record<string, any>): void {
		this.parent.speed = this.parent.MIN_SPEED;
        let takingDamage = this.owner.animation.isPlaying(PlayerAnimations.TAKE_DAMAGE);
        let attacking = this.owner.animation.isPlaying(PlayerAnimations.ATTACK_1);
        if(this.parent.health > 0 && !takingDamage && !attacking){
            this.owner.animation.play(PlayerAnimations.WALK);
        }    
	}

	update(deltaT: number): void {
        // Call the update method in the parent class - updates the direction the player is facing
        super.update(deltaT);

        // Get the input direction from the player controller
		let dir = this.parent.inputDir;

        // If the player is not moving - transition to the Idle state
        
		if(dir.isZero()){
			this.finished(PlayerStates.IDLE);
		} 
        // If the player hits the jump key - transition to the Jump state
        else if (Input.isJustPressed(HW3Controls.JUMP)) {
            this.finished(PlayerStates.JUMP);
        } 
        // If the player is not on the ground, transition to the fall state
        else if (!this.owner.onGround && this.parent.velocity.y !== 0) {
            this.finished(PlayerStates.FALL);
        }
        else if(this.parent.health <= 0){
            this.finished(PlayerStates.DEAD)
        }
        // Otherwise, move the player
        else {
            // Update the vertical velocity of the player
            
            this.parent.velocity.y += this.gravity*deltaT; 
            this.parent.velocity.x = dir.x * this.parent.speed
            this.owner.move(this.parent.velocity.scaled(deltaT));
        }

	}

	onExit(): Record<string, any> {
		if (!this.owner.animation.isPlaying(PlayerAnimations.ATTACK_1)) {
            this.owner.animation.stop();
        }
		return {};
	}
}