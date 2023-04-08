import { PlayerStates, PlayerAnimations } from "../PlayerController";
import PlayerState from "./PlayerState";
import Input from "../../../Wolfie2D/Input/Input";
import { HW3Controls } from "../../HW3Controls";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import { HW3Events } from "../../HW3Events";
import Receiver from "../../../Wolfie2D/Events/Receiver";
import HW3AnimatedSprite from "../../Nodes/HW3AnimatedSprite";
import PlayerController from "../PlayerController";

export default class Idle extends PlayerState {

    protected receiver: Receiver;

    public constructor(parent: PlayerController, owner: HW3AnimatedSprite){
		super(parent, owner);
        this.receiver = new Receiver();
        this.receiver.subscribe(HW3Events.TALKING_TO_NPC);
	}

	public onEnter(options: Record<string, any>): void {
        this.owner.animation.queue(PlayerAnimations.IDLE,true);
        
		this.parent.speed = this.parent.MIN_SPEED;
        this.parent.velocity.x = 0;
        this.parent.velocity.y = 0;
	}

    public handleInput(event: GameEvent): void {
        switch(event.type) {
            case HW3Events.TALKING_TO_NPC: {
                this.finished(PlayerStates.TALKING);
                break;
            }
            // Default - throw an error
            default: {
                throw new Error(`Unhandled event in PlayerState of type ${event.type}`);
            }
        }
	}

	public update(deltaT: number): void {
        while (this.receiver.hasNextEvent()) {
            this.handleInput(this.receiver.getNextEvent());
        }

        if(!this.owner.animation.isPlaying(PlayerAnimations.IDLE)){
           if(this.parent.health> 0 && !this.owner.animation.isPlaying(PlayerAnimations.TAKE_DAMAGE) && (!this.owner.animation.isPlaying(PlayerAnimations.ATTACK_1)) || (!this.owner.animation.isPlaying(PlayerAnimations.ATTACK_2))){
                this.owner.animation.play(PlayerAnimations.IDLE)
           }
        }
        // Adjust the direction the player is facing
		super.update(deltaT);

        // Get the direction of the player's movement
		let dir = this.parent.inputDir;

        // If the player is moving along the x-axis, transition to the walking state
		if (!dir.isZero() && dir.y === 0){
			this.finished(PlayerStates.WALK);
		} 
        // If the player is jumping, transition to the jumping state
        else if (Input.isJustPressed(HW3Controls.JUMP)) {
            this.finished(PlayerStates.JUMP);
        }
        // If the player is not on the ground, transition to the falling state
        else if (!this.owner.onGround && this.parent.velocity.y > 0) {
            this.finished(PlayerStates.FALL);
        } 
        // Otherwise, do nothing (keep idling)
        else {
            // Update the vertical velocity of the player
            this.parent.velocity.y += this.gravity*deltaT;
            // Move the player
            this.owner.move(this.parent.velocity.scaled(deltaT));
        }
		
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}