import { EnemyStates, EnemyAnimations } from "../EnemyController";
import EnemyState from "./EnemyState";
import Input from "../../../Wolfie2D/Input/Input";
import { HW3Controls } from "../../HW3Controls";

export default class Idle extends EnemyState {

	public onEnter(options: Record<string, any>): void {
        this.owner.animation.playIfNotAlready(EnemyAnimations.IDLE,true);
        
		this.parent.speed = this.parent.MIN_SPEED;
        this.parent.velocity.x = 0;
        this.parent.velocity.y = 0;
	}

	public update(deltaT: number): void {
        // Adjust the direction the Enemy is facing
		super.update(deltaT);

        // // Get the direction of the Enemy's movement
		// let dir = this.parent.inputDir;

        // // If the Enemy is moving along the x-axis, transition to the walking state
		// if (!dir.isZero() && dir.y === 0){
		// 	this.finished(EnemyStates.WALK);
		// } 
        // // If the Enemy is jumping, transition to the jumping state
        // else if (Input.isJustPressed(HW3Controls.JUMP)) {
        //     this.finished(EnemyStates.JUMP);
        // }
        // // If the Enemy is not on the ground, transition to the falling state
        // else if (!this.owner.onGround && this.parent.velocity.y > 0) {
        //     this.finished(EnemyStates.FALL);
        // } 
        // Otherwise, do nothing (keep idling)
        // else {
            // Update the vertical velocity of the Enemy
            this.parent.velocity.y += this.gravity*deltaT;
            // Move the Enemy
            this.owner.move(this.parent.velocity.scaled(deltaT));
        // }
		
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}