/**
 * An enum with all of the physics groups for HW4
 */
export const HW3PhysicsGroups = {
    // Physics groups for the player and the player's weapon
    PLAYER: "PLAYER",
    PLATFORM: "PLATFORM",
    /* 
        Physics groups for the different tilemap layers. Physics groups for tilemaps are
        embedded in the tilemap layer data by a property called "Group". This lets you
        set the physics group for a particular tilemap layer.
    */
    GROUND: "GROUND",
    BOSS: "BOSS"
    
} as const;