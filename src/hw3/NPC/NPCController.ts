import Emitter from "../../Wolfie2D/Events/Emitter";
import Receiver from "../../Wolfie2D/Events/Receiver";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import ControllerAI from "../../Wolfie2D/AI/ControllerAI";
import Input from "../../Wolfie2D/Input/Input";

import HW3AnimatedSprite from "../Nodes/HW3AnimatedSprite";
import { NPCEvents } from "../Events/NPCEvents";
import { HW3Controls } from "../HW3Controls";
import { QuestRequirements } from "../Text/Quests";
import { QuestRewards } from "../Text/Quests";

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
    private quests: Array<string>;
    private npcID: number;
    private playerHasQuest: boolean;
    private playerHasMyQuest: boolean;

    initializeAI(owner: HW3AnimatedSprite, options: Record<string, any>): void {
        this.owner = owner;
        this.player = options.player;
        this.emitter = new Emitter();
        this.receiver = new Receiver();
        this.isWaiting = true;;
        this.quests = options.quests;
        this.npcID = options.id;
        this.playerHasQuest = false;
        this.playerHasMyQuest = false;

        this.receiver.subscribe(NPCEvents.ACCEPT_QUEST);
        this.receiver.subscribe(NPCEvents.DECLINE_QUEST);
        this.receiver.subscribe(NPCEvents.PROCESS_QUEST);
        this.receiver.subscribe(NPCEvents.SUBMIT_QUEST);
        this.receiver.subscribe(NPCEvents.SUBMIT_SUCCESS);
        this.owner.animation.playIfNotAlready(NPCAnimations.IDLE);
    }

    activate(options: Record<string, any>): void {
        return;
    }

    handleEvent(event: GameEvent): void {
        switch(event.type) {
            case (NPCEvents.ACCEPT_QUEST): {
                this.isWaiting = true;
                break;
            }
            case (NPCEvents.DECLINE_QUEST): {
                this.isWaiting = true;
                break;
            }
            case (NPCEvents.PROCESS_QUEST): {
                this.playerHasQuest = true;
                if (event.data.get("id") === this.npcID) {
                    this.playerHasMyQuest = true;
                }
                break;
            }
            case (NPCEvents.SUBMIT_QUEST): {
                this.isWaiting = true;
                if (this.playerHasMyQuest) {
                    let goblins = event.data.get("goblins");
                    let swords = event.data.get("swords");
                    let jellies = event.data.get("jellies");
                    this.handleSubmit(goblins, swords, jellies);
                }
                break;
            }
            case (NPCEvents.SUBMIT_SUCCESS): {
                this.playerHasQuest = false;
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

        let playerWantsToTalk = Input.isJustPressed(HW3Controls.INTERACT);
        let playerNear = this.player.boundary.containsPoint(this.owner.position);

        if (playerWantsToTalk && playerNear && this.isWaiting) {
            // if player has a quest and it's mine, display the turn-in prompt
            if (this.playerHasMyQuest) {
                this.isWaiting = false;
                let currentQuest = this.quests[this.quests.length - 1];
                this.emitter.fireEvent(NPCEvents.TALKING_TO_NPC, { questID: currentQuest, npcID: this.npcID, isSubmitting: true });
            }
            // if we're out of quests or player already has another quest, just do small talk
            else if (this.quests.length === 0 || this.playerHasQuest) {
                this.emitter.fireEvent(NPCEvents.SMALL_TALK, { pos: this.owner.position });
            }
            // if we have quests and player doesn't have one, give one to them
            else {
                this.isWaiting = false;
                let currentQuest = this.quests[this.quests.length - 1];
                this.emitter.fireEvent(NPCEvents.TALKING_TO_NPC, { questID: currentQuest, npcID: this.npcID, isSubmitting: false });
            }
        }
    }

    handleSubmit(goblins: number, swords: number, jellies: number): void {
        let currentQuest = this.quests[this.quests.length - 1];
        let requirements:Array<string> = QuestRequirements[currentQuest].split(' ');

        let goblinsMet = goblins >= parseInt(requirements[0]);
        let swordsMet = swords >= parseInt(requirements[1]);
        let jelliesMet = jellies >= parseInt(requirements[2])
        if (goblinsMet && swordsMet && jelliesMet) {
            let reward = parseInt(QuestRewards[currentQuest])
            this.emitter.fireEvent(NPCEvents.SUBMIT_SUCCESS, { gold: reward, subtract: requirements });
            this.playerHasMyQuest = false;
            this.quests.pop();
            console.log(reward);
        }
        else {
            let say = "You don't have the required items.";
            this.emitter.fireEvent(NPCEvents.SMALL_TALK, { pos: this.owner.position, text: say })
        }


    }
}