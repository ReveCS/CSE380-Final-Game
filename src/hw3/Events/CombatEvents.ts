/**
 * A set of events for Combat
 */
export const CombatEvents = {
    // The events sent when the player attacks
    PLAYER_ATTACK_PHYSICAL: "PLAYER_ATTACK_PHYSICAL",
    PLAYER_ATTACK_RANGED: "PLAYER_ATTACK_RANGED",
    /**
     * The events sent when an enemy attacks
     * 
     * Has data: { dmg: number }
     */
    ENEMY_ATTACK_PHYSICAL: "ENEMY_ATTACK_PHYSICAL",
    ENEMY_ATTACK_RANGED: "ENEMY_ATTACK_RANGED",
    
} as const;
