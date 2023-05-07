import { PlayerStates, PlayerAnimations } from "../PlayerController";
import PlayerState from "./PlayerState";
import Input from "../../../Wolfie2D/Input/Input";
import { HW3Controls } from "../../HW3Controls";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import { NPCEvents } from "../../Events/NPCEvents";
import Receiver from "../../../Wolfie2D/Events/Receiver";
import HW3AnimatedSprite from "../../Nodes/HW3AnimatedSprite";
import PlayerController from "../PlayerController";

export default class Talking extends PlayerState {

    protected receiver: Receiver;

    public constructor(parent: PlayerController, owner: HW3AnimatedSprite){
		super(parent, owner);
        this.receiver = new Receiver();
        this.receiver.subscribe(NPCEvents.ACCEPT_QUEST);
        this.receiver.subscribe(NPCEvents.DECLINE_QUEST);
        this.receiver.subscribe(NPCEvents.SUBMIT_QUEST);
	}

	public onEnter(options: Record<string, any>): void {
        this.owner.animation.queue(PlayerAnimations.IDLE,true);
        
		this.parent.speed = this.parent.MIN_SPEED;
        this.parent.velocity.x = 0;
        this.parent.velocity.y = 0;
	}

    public handleInput(event: GameEvent): void {
        switch(event.type) {
            case NPCEvents.ACCEPT_QUEST: {
                this.parent.idOfQuestNPC = event.data.get("npcID");
                sessionStorage.setItem("idOfQuestNPC", this.parent.idOfQuestNPC.toString());
                this.emitter.fireEvent(NPCEvents.PROCESS_QUEST, { id: this.parent.idOfQuestNPC });
                this.finished(PlayerStates.IDLE);
                break;
            }
            case NPCEvents.DECLINE_QUEST: {
                this.finished(PlayerStates.IDLE);
                break;
            }
            case NPCEvents.SUBMIT_QUEST: {
                this.finished(PlayerStates.IDLE);
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

        // Adjust the direction the player is facing
		super.update(deltaT);

        // Get the direction of the player's movement
		let dir = this.parent.inputDir;
 
        // Otherwise, do nothing (keep idling)
        // Update the vertical velocity of the player
        this.parent.velocity.y += this.gravity*deltaT;
         // Move the player
        this.owner.move(this.parent.velocity.scaled(deltaT));
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}