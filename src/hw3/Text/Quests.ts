/**
 * A set of strings of NPC quests
 * Make sure to add punctuation at the end so it displays on quest UI.
 */
export const Quests: { [id: string]: string } = {
    1: `The lands of Atnis have been plagued with theiving Goblins. Bring me back 10 Goblin skulls.`,
    2: `testing quest. give me 1 goblin skull.`
} as const;

/**
 * A set of strings to define the requirements for a corresponding quest
 * In the format: [number] [number] [number]
 * corresponding to: goblinsKilled swordsKilled jelliesKilled
 */
export const QuestRequirements: { [id: string]: string } = {
    1: `10 0 0`,
    2: `1 0 0`
} as const;

/**
 * A set of strings to define the gold reward for a corresponding quest
 * In the format: [number]
 */
export const QuestRewards: { [id: string]: string } = {
    1: `20`,
    2: `100`
} as const;
