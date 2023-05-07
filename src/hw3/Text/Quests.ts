/**
 * A set of strings of NPC quests
 * Make sure to add punctuation at the end so it displays on quest UI.
 */
export const Quests: { [id: string]: string } = {
    0: `Did you kill that goblin that kept harassing me? Show me its skull and I'll reward you handsomely.`,
    1: `The lands of Atnis have been plagued with theiving Goblins. Bring me back 10 Goblin skulls.`,
} as const;

/**
 * A set of strings to define the requirements for a corresponding quest
 * In the format: [number] [number] [number]
 * corresponding to: goblinsKilled swordsKilled jelliesKilled
 */
export const QuestRequirements: { [id: string]: string } = {
    0: `1 0 0`,
    1: `10 0 0`,
} as const;

/**
 * A set of strings to define the gold reward for a corresponding quest
 * In the format: [number]
 */
export const QuestRewards: { [id: string]: string } = {
    0: `1`,
    1: `20`,
} as const;
