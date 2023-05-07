/**
 * A set of events for NPC Events
 */
export const NPCEvents = {
    /*
     * The event sent when the player talks to an NPC
     *
     * Has data: { questID: string, npcID: number }
    */
    TALKING_TO_NPC: "TALKING_TO_NPC",

    /*
     * The events sent when the player accepts/declines a quest
     *
     * Has data: { npcID: number } id of NPC as set in initializeNPC() call
    */
    ACCEPT_QUEST: "ACCEPT_QUEST",
    DECLINE_QUEST: "DECLINE_QUEST",
    /*
     * The event sent when player finishes accepting quest so that an NPC can process what to display next
     *
     * Has data: { id: number } id of NPC player got quest from
    */
    PROCESS_QUEST: "PROCESS_QUEST",
    SUBMIT_QUEST: "SUBMIT_QUEST",

    /*
     * The event sent when NPC is out of quets and player tries to talk
     *
     * Has data: { pos: Vec2, text: string } pos is position of NPC and text is optional
    */
    SMALL_TALK: "SMALL_TALK",

    /*
     * The event sent when player successfully turns in a quest
     *
     * Has data: { gold: number, subtract: Array<string> }
     * gold is how much gold to give the player
     * subtract is an array telling us how many items to consume from the player
    */
   SUBMIT_SUCCESS: "SUBMIT_SUCCESS"
    
} as const;
