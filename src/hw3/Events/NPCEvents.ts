/**
 * A set of events for NPC Events
 */
export const NPCEvents = {
    /*
     * The event sent when the player talks to an NPC
     *
     * Has data: { id: string } id of the quest to display
    */
    TALKING_TO_NPC: "TALKING_TO_NPC",

    // The event sent when the NPC finishes talking
    DONE_TALKING_TO_NPC: "DONE_TALKING_TO_NPC",

    /*
     * The events sent when the player accepts/declines a quest
     *
     * Has data: { id: number } id is that of the specific NPC's
    */
    ACCEPT_QUEST: "ACCEPT_QUEST",
    DECLINE_QUEST: "DECLINE_QUEST",
    
} as const;
