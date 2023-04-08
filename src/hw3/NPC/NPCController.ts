import Receiver from "../../Wolfie2D/Events/Receiver";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import ControllerAI from "../../Wolfie2D/AI/ControllerAI";

import HW3AnimatedSprite from "../Nodes/HW3AnimatedSprite";
import { HW3Events } from "../HW3Events";

/**
 * Animation keys for the NPC spritesheet
 */
export const NPCAnimations = {
    IDLE: "IDLE",
} as const

export default class NPCController extends ControllerAI {
    protected owner: HW3AnimatedSprite;
    protected receiver: Receiver;

    initializeAI(owner: HW3AnimatedSprite, options: Record<string, any>): void {
        this.owner = owner;

        // Add code to play anim
        this.owner.animation.playIfNotAlready(NPCAnimations.IDLE);
        // this.receiver.subscribe(HW3Events.ACCEPT_QUEST);
        // this.receiver.subscribe(HW3Events.DECLINE_QUEST);
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

    }
}