import Emitter from "../../Wolfie2D/Events/Emitter";
import Receiver from "../../Wolfie2D/Events/Receiver";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import ControllerAI from "../../Wolfie2D/AI/ControllerAI";
import Input from "../../Wolfie2D/Input/Input";

import HW3AnimatedSprite from "../Nodes/HW3AnimatedSprite";
import { NPCEvents } from "../Events/NPCEvents";
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
    protected receiver: Receiver;
    private isWaiting: Boolean;
    private doneTalking: Boolean;
    private quests: Array<string>;

    initializeAI(owner: HW3AnimatedSprite, options: Record<string, any>): void {
        this.owner = owner;
        this.player = options.player;
        this.emitter = new Emitter();
        this.receiver = new Receiver();
        this.isWaiting = true;
        this.doneTalking = false;
        this.quests = options.quests;

        // this.receiver.subscribe(NPCEvents.DONE_TALKING_TO_NPC);
        this.receiver.subscribe(NPCEvents.ACCEPT_QUEST);
        this.receiver.subscribe(NPCEvents.DECLINE_QUEST);
        this.owner.animation.playIfNotAlready(NPCAnimations.IDLE);
    }

    activate(options: Record<string, any>): void {
        return;
    }

    handleEvent(event: GameEvent): void {
        switch(event.type) {
            // case (NPCEvents.DONE_TALKING_TO_NPC): {
            //     this.doneTalking = true;
            //     break;
            // }
            case (NPCEvents.ACCEPT_QUEST): {
                this.doneTalking = false;
                this.isWaiting = true;
                break;
            }
            case (NPCEvents.DECLINE_QUEST): {
                this.doneTalking = false;
                this.isWaiting = true;
                break;
            }
            // Default - throw an error
            default: {
                throw new Error(`Unhandled event in NPCController of type ${event.type}`);
            }
        }
    }

    update(deltaT: number): void {
        while (this.receiver.hasNextEvent()) {
            this.handleEvent(this.receiver.getNextEvent());
        }

        // if we're waiting to give a quest
        if (this.isWaiting) {
            let playerWantsToTalk = Input.isJustPressed(HW3Controls.INTERACT);
            let playerNear = this.player.boundary.containsPoint(this.owner.position);

            if (playerWantsToTalk && playerNear) {
                console.log("Talking to NPC.")
                this.isWaiting = false;
                if (this.quests.length === 0) throw new Error("NPC ran out of quests!");
                let currentQuest = this.quests[this.quests.length - 1];
                this.emitter.fireEvent(NPCEvents.TALKING_TO_NPC, {id: currentQuest});
            }
        }
    }
}