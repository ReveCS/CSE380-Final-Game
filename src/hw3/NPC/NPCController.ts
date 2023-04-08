import Emitter from "../../Wolfie2D/Events/Emitter";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import ControllerAI from "../../Wolfie2D/AI/ControllerAI";
import Input from "../../Wolfie2D/Input/Input";

import HW3AnimatedSprite from "../Nodes/HW3AnimatedSprite";
import { HW3Events } from "../HW3Events";
import { HW3Controls } from "../HW3Controls";

/**
 * Animation keys for the NPC spritesheet
 */
export const NPCAnimations = {
    IDLE: "IDLE",
} as const

export default class NPCController extends ControllerAI {
    protected owner: HW3AnimatedSprite;
    protected player: HW3AnimatedSprite;
    protected emitter: Emitter;
    private isWaiting: Boolean;

    initializeAI(owner: HW3AnimatedSprite, options: Record<string, any>): void {
        this.owner = owner;
        this.player = options.player;
        this.emitter = new Emitter();
        this.isWaiting = true;
        this.owner.animation.playIfNotAlready(NPCAnimations.IDLE);
    }

    activate(options: Record<string, any>): void {
        return;
    }

    handleEvent(event: GameEvent): void {
        switch(event.type) {
            case HW3Events.ACCEPT_QUEST: {
                break;
            }
            case HW3Events.DECLINE_QUEST: {
                break;
            }
            // Default - throw an error
            default: {
                throw new Error(`Unhandled event in NPCController of type ${event.type}`);
            }
        }
    }

    update(deltaT: number): void {
        if (this.isWaiting) {
            let playerWantsToTalk = Input.isJustPressed(HW3Controls.INTERACT)
            let playerNear = this.owner.boundary.overlaps(this.player.boundary)

            if (playerWantsToTalk && playerNear) {
                console.log("Talking to NPC.")
                this.emitter.fireEvent(HW3Events.TALKING_TO_NPC);
                this.isWaiting = false;
            }
        }
        else {
            if (Input.isJustPressed(HW3Controls.ACCEPT_QUEST)) {
                this.emitter.fireEvent(HW3Events.ACCEPT_QUEST);
                this.isWaiting = true;
            }
            else if (Input.isJustPressed(HW3Controls.DECLINE_QUEST)) {
                this.emitter.fireEvent(HW3Events.DECLINE_QUEST);
                this.isWaiting = true;
            }
        }
    }
}