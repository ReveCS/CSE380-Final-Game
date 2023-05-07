/**
 * A set of strings of NPC quests
 */
export const Quests: { [id: string]: string } = {
    1: `The lands of Atnis have been plagued with theiving Goblins. Bring me back 10 Goblin skulls.`,
    2: `testing quest. give me 1 goblin skull.`
} as const;

/**
 * A set of strings to define the requirements for a corresponding quest
 * In the format: [goblin/sword/jelly] [number]
 */
export const QuestRequirements: { [id: string]: string } = {
    1: `goblin 10`,
    2: `goblin 1`
} as const;

/**
 * A set of strings to define the gold reward for a corresponding quest
 * In the format: [number]
 */
export const QuestRewards: { [id: string]: string } = {
    1: `20`,
    2: `100`
} as const;
