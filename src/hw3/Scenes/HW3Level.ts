import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Input from "../../Wolfie2D/Input/Input";
import { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Rect from "../../Wolfie2D/Nodes/Graphics/Rect";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import Scene from "../../Wolfie2D/Scene/Scene";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";
import Viewport from "../../Wolfie2D/SceneGraph/Viewport";
import Timer from "../../Wolfie2D/Timing/Timer";
import Color from "../../Wolfie2D/Utils/Color";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import PlayerController, { PlayerTweens } from "../Player/PlayerController";
import PlayerWeapon from "../Player/PlayerWeapon";
import NPCController from "../NPC/NPCController";

import { HW3Events } from "../Events/HW3Events";
import { HW3PhysicsGroups } from "../HW3PhysicsGroups";
import HW3FactoryManager from "../Factory/HW3FactoryManager";
import MainMenu from "./MainMenu";
import Particle from "../../Wolfie2D/Nodes/Graphics/Particle";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import HW3AnimatedSprite from "../Nodes/HW3AnimatedSprite";
import { NPCEvents } from "../Events/NPCEvents";
import EnemyController from "../Enemy/EnemyController";
import BossController from "../Boss/BossController";

/**
 * A const object for the layer names
 */
export const HW3Layers = {
    // The primary layer
    PRIMARY: "PRIMARY",
    // The UI layer
    UI: "UI",
    //INVENTORY: "INVENTORY"
} as const;

// The layers as a type
export type HW3Layer = typeof HW3Layers[keyof typeof HW3Layers]

/**
 * An abstract HW4 scene class.
 */
export default abstract class HW3Level extends Scene {

    /** Overrride the factory manager */
    public add: HW3FactoryManager;


    /** The particle system used for the player's weapon */
    protected playerWeaponSystem: PlayerWeapon
    /** The key for the player's animated sprite */
    protected playerSpriteKey: string;
    /** The animated sprite that is the player */
    protected player: AnimatedSprite;
    /** The player's spawn position */
    protected playerSpawn: Vec2;

    private healthLabel: Label;
	private healthBar: Label;
	private healthBarBg: Label;

    private bossHealthBar: Label;
    private bossHealthBarBg: Label;
    // Spites for UI
    private HPSprite: Sprite;
    private INVSprite: Sprite;
    private INVLabel: Label;
    private goblinSkullSprite: Sprite;
    private goblinCount: Label;
    private jellyHeartSprite: Sprite;
    private jellyCount: Label;
    private swordRubySprite: Sprite;
    private swordCount: Label;
    private potionSprite: Sprite;
    private potionCount: Label;
    protected QuestSprite: Sprite;
    protected bossHPSprite: Sprite;
    protected pauseSprite: Sprite;
    protected menuButton: Button;
    protected menuButtonDummy: Button;
    protected resumeButton: Button;
    protected resumeButtonDummy: Button;

    // The key and path to the sprites
    protected HP_KEY: string;
    protected HP_PATH: string;
    protected INV_KEY: string;
    protected INV_PATH: string;
    protected GOBLINSKULL_KEY: string;
    protected GOBLINSKULL_PATH: string;
    protected JELLYHEART_KEY: string;
    protected JELLYHEART_PATH: string;
    protected SWORDRUBY_KEY: string;
    protected SWORDRUBY_PATH: string;
    protected POTION_KEY: string;
    protected POTION_PATH: string;
    protected QUEST_KEY: string;
    protected QUEST_PATH: string;
    protected BOSS_HP_KEY:string;
    protected BOSS_HP_PATH:string;
    protected PAUSE_KEY: string;
    protected PAUSE_PATH: string;

    /* Portal */
    protected portalPosition: Vec2;
    protected portalHalfSize: Vec2;

    // Pause Menu things
    protected isPaused: boolean;

    // Potions
    protected potions: number;

    // Keep track of how many of each enemy
    protected goblinsKilled: number;
    protected jelliesKilled: number;
    protected swordsKilled: number;

    protected invincibleTimer: Timer;

    /** The end of level stuff */

    protected level1Complete: boolean;
    protected level2Complete: boolean;
    protected level3Complete: boolean;
    protected level4Complete: boolean;

    protected levelEndPosition: Vec2;
    protected levelEndHalfSize: Vec2;

    protected levelEndArea: Rect;
    protected nextLevel: new (...args: any) => Scene;
    protected levelEndTimer: Timer;
    protected levelEndLabel: Label;

    // Level end transition timer and graphic
    protected levelTransitionTimer: Timer;
    protected levelTransitionScreen: Rect;

    /** The keys to the tilemap and different tilemap layers */
    protected tilemapKey: string;
    protected platformLayerKey: string;
    protected wallsLayerKey: string;
    /** The scale for the tilemap */
    protected tilemapScale: Vec2;
    /** The platform layer of the tilemap */
    protected platform: OrthogonalTilemap;
    /** The wall layer of the tilemap */
    protected walls: OrthogonalTilemap;

    /** Sound and music */
    protected levelMusicKey: string;
    protected jumpAudioKey: string;
    protected spawnAudioKey:string;
    protected tileDestroyedAudioKey: string;
    protected deathSoundKey:string;
    protected hitKey:string;
    protected swingKey:string;
    protected playerHurtSoundKey: string;
    protected playerDeathSoundKey: string;

    public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, {...options, physics: {
            
            // TODO configure the collision groups and collision map
           groupNames:[HW3PhysicsGroups.GROUND,HW3PhysicsGroups.PLAYER,HW3PhysicsGroups.PLATFORM,HW3PhysicsGroups.BOSS,HW3PhysicsGroups.ENEMY],
           collisions: [[0,1,0,0,1],
                        [1,0,1,0,0],
                        [0,1,0,0,1],
                        [0,0,0,0,0],
                        [1,0,1,0,0]]

         }});
        this.add = new HW3FactoryManager(this, this.tilemaps);
    }

    public startScene(): void {
        // Initialize the layers
        this.initLayers();

        // Initialize the tilemaps
        this.initializeTilemap();

        // Initialize the sprite and particle system for the players weapon 
        // this.initializeWeaponSystem();

        this.initializeUI();

        // Initialize the player 
        this.initializePlayer(this.playerSpriteKey);

        // Initialize the viewport - this must come after the player has been initialized
        this.initializeViewport();
        this.subscribeToEvents();
        
    
        // Initialize the ends of the levels - must be initialized after the primary layer has been added
        // this.initializeLevelEnds();

        this.levelTransitionTimer = new Timer(500);
        this.levelEndTimer = new Timer(1000, () => {
            // After the level end timer ends, fade to black and then go to the next scene
            this.levelTransitionScreen.tweens.play("fadeIn");
        });

        // Initially disable player movement
        Input.disableInput();

        // Start the black screen fade out
        this.levelTransitionScreen.tweens.play("fadeOut");

        // Start playing the level music for the HW4 level
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: this.levelMusicKey, loop: true, holdReference: true});
    }

    /* Update method for the scene */

    public updateScene(deltaT: number) {
        // Handle all game events
        // for(let i = 0; i < this.playerWeaponSystem.getPool().length;i++){
        //     this.playerWeaponSystem.getPool()[i].setGroup("WEAPON");
        //     // this.handleParticleHit(i);
        // }
        
        while (this.receiver.hasNextEvent()) {
            this.handleEvent(this.receiver.getNextEvent());
        }
    }

    /**
     * Handle game events. 
     * @param event the game event
     */
    protected handleEvent(event: GameEvent): void {
        switch (event.type) {
            case HW3Events.PLAYER_ENTERED_LEVEL_END: {
                this.handleEnteredLevelEnd();
                break;
            }
            // When the level starts, reenable user input
            case HW3Events.LEVEL_START: {
                Input.enableInput();
                break;
            }
            // When the level ends, change the scene to the next level
            case HW3Events.LEVEL_END: {

                this.sceneManager.changeToScene(this.nextLevel);
                break;
            }
            case HW3Events.HEALTH_CHANGE: {
                this.handleHealthChange(event.data.get("curhp"), event.data.get("maxhp"));
                break;
            }
            case HW3Events.BOSS_HEALTH_CHANGE: {
                this.handleBossHealthChange(event.data.get("curhp"), event.data.get("maxhp"));
                break;
            }
            case HW3Events.PLAYER_DEAD: {
                this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: this.levelMusicKey, loop: true, holdReference: true});
                this.sceneManager.changeToScene(MainMenu);
                break;
            }
            case HW3Events.POTION: {
                if (this.potions > 0) {
                    this.handleHealthChange(event.data.get("curhp"), event.data.get("maxhp"));
                    this.potions -= 1;
                    this.potionCount.destroy;
                    this.potionCount = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.UI, {position: new Vec2(225, 220), text: "" + this.potions});
                    this.potionCount.visible = false;
                }
                break;
            }
            case HW3Events.INVENTORY: {
                this.handleInventory();
                break;
            }
            // When player presses escape button, pause game layer and display pause screen
            case HW3Events.GAME_PAUSE: {
                this.handleGamePause();
                break;
            }
            case HW3Events.ENEMY_KILLED: {
                this.handleEnemyKilled(event);
                break;
            }
            case HW3Events.BOSS_SPAWN:{
                this.bossHPSprite.visible = true;
                this.bossHealthBar.visible = true;
                this.bossHealthBarBg.visible = true;
                break;
            }
            case HW3Events.CHEAT1: {
                this.handleCheat1();
                break;
            }
            case HW3Events.CHEAT2: {
                this.handleCheat2();
                break;
            }
            case HW3Events.CHEAT3: {
                this.handleCheat3();
                break;
            }
            case HW3Events.CHEAT4: {
                this.handleCheat4();
                break;
            }
            case HW3Events.CHEAT5: {
                this.handleCheat5();
                break;
            }
            case HW3Events.INVINCIBLE: {
                this.player.isCollidable = false;
                this.invincibleTimer = new Timer(2, () => {
                    this.player.isCollidable = true;
                });
                break;
            }
            case NPCEvents.TALKING_TO_NPC: {
                this.handleTalkingNPC(event.data.get("questID"), event.data.get("npcID"), event.data.get("isSubmitting"));
                break;
            }
            case NPCEvents.ACCEPT_QUEST: {
                this.clearQuestUI();
                // this.handleAcceptQuest();
                break;
            }
            case NPCEvents.DECLINE_QUEST: {
                this.clearQuestUI();
                break;
            }
            case NPCEvents.SUBMIT_QUEST: {
                this.clearQuestUI();
                break;
            }
            case NPCEvents.SMALL_TALK: {
                this.handleSmallTalkNPC(event.data.get("pos"), event.data.get("text"));
                break;
            }
            case NPCEvents.SUBMIT_SUCCESS: {
                this.handleSubmitSuccess(event.data.get("subtract"));
                break;
            }
            // Default: Throw an error! No unhandled events allowed.
            default: {
                throw new Error(`Unhandled event caught in scene with type ${event.type}`)
            }
        }
    }

    
    /* Handlers for the different events the scene is subscribed to */

    /**
     * Handle particle hit events
     * @param particleId the id of the particle
     */
    // protected handleParticleHit(particleId: number): void {
    //     let particles = this.playerWeaponSystem.getPool();
    //     let particle = particles.find(particle => particle.id === particleId);
        
    //     if (particle !== undefined) {
    //         // Get the destructable tilemap
    //         let tilemap = this.destructable;

    //         let min = new Vec2(particle.sweptRect.left, particle.sweptRect.top);
    //         let max = new Vec2(particle.sweptRect.right, particle.sweptRect.bottom);

    //         // Convert the min/max x/y to the min and max row/col in the tilemap array
    

    //         // Loop over all possible tiles the particle could be colliding with 
    //         for(let col = minIndex.x; col <= maxIndex.x; col++){
    //             for(let row = minIndex.y; row <= maxIndex.y; row++){
    //                 // If the tile is collideable -> check if this particle is colliding with the tile
    //                 if(tilemap.isTileCollidable(col, row) && this.particleHitTile(tilemap, particle, col, row)){
    //                     this.emitter.fireEvent(GameEventType.PLAY_SOUND, { key: this.tileDestroyedAudioKey, loop: false, holdReference: false });
    //                     tilemap.setTileAtRowCol(new Vec2(col,row),0);

    //                     // TODO Destroy the tile
    //                 }
    //             }
    //         }
    //     }
    // }

    /**
     * Checks if a particle hit the tile at the (col, row) coordinates in the tilemap.
     * 
     * @param tilemap the tilemap
     * @param particle the particle
     * @param col the column the 
     * @param row the row 
     * @returns true of the particle hit the tile; false otherwise
     */
    // protected particleHitTile(tilemap: OrthogonalTilemap, particle: Particle, col: number, row: number): boolean {
    //     // TODO detect whether a particle hit a tile
    //     if(tilemap.getTileAtRowCol(new Vec2(col,row)) && particle.collidedWithTilemap){
    //         return true
    //     }
    //     return false
    // }

    /**
     * Handle the event when the player enters the level end area.
     */
    protected handleEnteredLevelEnd(): void {
        // If the timer hasn't run yet, start the end level animation
        if (!this.levelEndTimer.hasRun() && this.levelEndTimer.isStopped()) {
            this.levelEndTimer.start();
        }
    }
    /**
     * This is the same healthbar I used for hw2. I've adapted it slightly to account for the zoom factor. Other than that, the
     * code is basically the same.
     * 
     * @param currentHealth the current health of the player
     * @param maxHealth the maximum health of the player
     */
    protected handleHealthChange(currentHealth: number, maxHealth: number): void {
		let unit = this.healthBarBg.size.x / maxHealth;
        
		this.healthBar.size.set(this.healthBarBg.size.x - unit * (maxHealth - currentHealth), this.healthBarBg.size.y);
		this.healthBar.position.set(this.healthBarBg.position.x - (unit / 2 / this.getViewScale()) * (maxHealth - currentHealth), this.healthBarBg.position.y);

	}

    protected handleBossHealthChange(currentHealth: number, maxHealth: number):void{
        let unit = this.bossHealthBarBg.size.x/maxHealth;
        this.bossHealthBar.size.set(this.bossHealthBarBg.size.x - unit * (maxHealth - currentHealth), this.bossHealthBarBg.size.y);
        this.bossHealthBar.position.set(this.bossHealthBarBg.position.x - (unit/2/this.getViewScale())* (maxHealth-currentHealth), this.bossHealthBarBg.position.y);
        this.bossHealthBar.backgroundColor = currentHealth <= maxHealth * 1/4 ? Color.RED: currentHealth <= maxHealth * 1/2 ? Color.YELLOW: Color.GREEN;
    }

    protected handlePotion(): void {
        
    }

    protected handleInventory(): void {
        if (this.INVSprite.visible == false) {
            this.INVSprite.visible = true;
            this.INVLabel.visible = true;
            this.goblinSkullSprite.visible = true;
            this.goblinCount.visible = true;
            this.jellyHeartSprite.visible = true;
            this.jellyCount.visible = true;
            this.swordRubySprite.visible = true;
            this.swordCount.visible = true;
            this.potionSprite.visible = true;
            this.potionCount.visible = true;
        }
        else {
            this.INVSprite.visible = false;
            this.INVLabel.visible = false;
            this.goblinSkullSprite.visible = false;
            this.goblinCount.visible = false;
            this.jellyHeartSprite.visible = false;
            this.jellyCount.visible = false;
            this.swordRubySprite.visible = false;
            this.swordCount.visible = false;
            this.potionSprite.visible = false;
            this.potionCount.visible = false;
        }
    }

    /* Initialization methods for everything in the scene */

    /**
     * Initialzes the layers
     */
    protected initLayers(): void {
        // Add a layer for UI
        this.addUILayer(HW3Layers.UI);
        // Add a layer for players and enemies
        this.addLayer(HW3Layers.PRIMARY);
    }
    /**
     * Initializes the tilemaps
     * @param key the key for the tilemap data
     * @param scale the scale factor for the tilemap
     */
    protected initializeTilemap(): void {
        if (this.tilemapKey === undefined || this.tilemapScale === undefined) {
            throw new Error("Cannot add the homework 4 tilemap unless the tilemap key and scale are set.");
        }
        // Add the tilemap to the scene
        this.add.tilemap(this.tilemapKey, this.tilemapScale);

        if (this.platformLayerKey === undefined || this.wallsLayerKey === undefined) {
            throw new Error("Make sure the keys for the destuctible layer and wall layer are both set");
        }

        // Get the wall and destructible layers 
        
        this.walls = this.getTilemap(this.wallsLayerKey) as OrthogonalTilemap;
        this.walls.setGroup(HW3PhysicsGroups.GROUND)
        this.platform = this.getTilemap(this.platformLayerKey) as OrthogonalTilemap;
        this.platform.setGroup(HW3PhysicsGroups.PLATFORM);

        // Add physicss to the wall layer
        this.walls.addPhysics();
        // Add physics to the destructible layer of the tilemap
        this.platform.addPhysics();
        
     }
    /**
     * Handles all subscriptions to events
     */
    protected subscribeToEvents(): void {
        this.receiver.subscribe(HW3Events.PLAYER_ENTERED_LEVEL_END);
        this.receiver.subscribe(HW3Events.LEVEL_START);
        this.receiver.subscribe(HW3Events.LEVEL_END);
        this.receiver.subscribe(HW3Events.HEALTH_CHANGE);
        this.receiver.subscribe(HW3Events.BOSS_HEALTH_CHANGE);
        this.receiver.subscribe(HW3Events.PLAYER_DEAD);
        this.receiver.subscribe(HW3Events.POTION);
        this.receiver.subscribe(HW3Events.INVENTORY);
        this.receiver.subscribe(HW3Events.GAME_PAUSE);
        this.receiver.subscribe(HW3Events.ENEMY_KILLED);
        this.receiver.subscribe(HW3Events.BOSS_SPAWN);
        this.receiver.subscribe(HW3Events.CHEAT1);
        this.receiver.subscribe(HW3Events.CHEAT2);
        this.receiver.subscribe(HW3Events.CHEAT3);
        this.receiver.subscribe(HW3Events.CHEAT4);
        this.receiver.subscribe(HW3Events.CHEAT5);
        this.receiver.subscribe(HW3Events.INVINCIBLE);
        this.receiver.subscribe(NPCEvents.TALKING_TO_NPC);
        this.receiver.subscribe(NPCEvents.ACCEPT_QUEST);
        this.receiver.subscribe(NPCEvents.DECLINE_QUEST);
        this.receiver.subscribe(NPCEvents.SUBMIT_QUEST);
        this.receiver.subscribe(NPCEvents.SUBMIT_SUCCESS);
        this.receiver.subscribe(NPCEvents.SMALL_TALK);
        
    }
    /**
     * Adds in any necessary UI to the game
     */
    protected initializeUI(): void {

        // HealthBar Sprite
        this.HPSprite = this.add.sprite(this.HP_KEY, HW3Layers.UI);
        this.HPSprite.position.copy(new Vec2(50, 20));

        // HealthBar
		this.healthBar = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.UI, {position: new Vec2(57, 20), text: ""});
        this.healthBar.size.set(125, 20);
		this.healthBar.backgroundColor = Color.RED;

        // HealthBar Border
		this.healthBarBg = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.UI, {position: new Vec2(57, 20), text: ""});
        this.healthBarBg.size.set(125, 20);
		this.healthBarBg.borderColor = Color.TRANSPARENT;

        // BossHealthBar Sprite
        this.bossHPSprite = this.add.sprite(this.BOSS_HP_KEY,HW3Layers.UI);
        this.bossHPSprite.position.copy(new Vec2(300,350));
        this.bossHPSprite.scale.set(4,3);
        this.bossHPSprite.visible = false;
        

        // BossHealthBar
        this.bossHealthBar = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.UI, {position: new Vec2(300,348), text: ""});
        this.bossHealthBar.size.set(645,32);
        this.bossHealthBar.backgroundColor = Color.GREEN;
        this.bossHealthBar.visible = false;

        // BossHealthBar Border
        this.bossHealthBarBg = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.UI, {position: new Vec2(300,348), text: ""});
        this.bossHealthBarBg.size.set(645,32);
        this.bossHealthBarBg.backgroundColor = Color.TRANSPARENT;
        this.bossHealthBarBg.visible = false;
        
        // Inventory screen and UI
        this.INVSprite = this.add.sprite(this.INV_KEY, HW3Layers.UI);
        this.INVSprite.position.copy(new Vec2(300, 200));
        this.INVSprite.scale.set(1/4, 1/4);
        this.INVSprite.visible = false;

        this.INVLabel = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.UI, {position: new Vec2(300, 135), text: "Inventory"});
        this.INVLabel.textColor = Color.BLACK;
        this.INVLabel.font = "Hjet-Regular";
        this.INVLabel.visible = false;

        this.goblinSkullSprite = this.add.sprite(this.GOBLINSKULL_KEY, HW3Layers.UI);
        this.goblinSkullSprite.position.copy(new Vec2(240, 180));
        this.goblinSkullSprite.scale.set(1/2, 1/2);
        this.goblinSkullSprite.visible = false;

        this.goblinCount = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.UI, {position: new Vec2(225, 165), text: "" + this.goblinsKilled});
        this.goblinCount.textColor = Color.BLACK;
        this.goblinCount.font = "Hjet-Regular";
        this.goblinCount.scale.set(3/4, 3/4);
        this.goblinCount.visible = false;

        this.jellyHeartSprite = this.add.sprite(this.JELLYHEART_KEY, HW3Layers.UI);
        this.jellyHeartSprite.position.copy(new Vec2(300, 180));
        this.jellyHeartSprite.scale.set(9/24, 9/24);
        this.jellyHeartSprite.visible = false;

        this.jellyCount = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.UI, {position: new Vec2(282, 165), text: "" + this.jelliesKilled});
        this.jellyCount.textColor = Color.BLACK;
        this.jellyCount.font = "Hjet-Regular";
        this.jellyCount.scale.set(3/4, 3/4);
        this.jellyCount.visible = false;

        this.swordRubySprite = this.add.sprite(this.SWORDRUBY_KEY, HW3Layers.UI);
        this.swordRubySprite.position.copy(new Vec2(360, 180));
        this.swordRubySprite.scale.set(11/24, 11/24);
        this.swordRubySprite.visible = false;

        this.swordCount = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.UI, {position: new Vec2(343, 165), text: "" + this.swordsKilled});
        this.swordCount.textColor = Color.BLACK;
        this.swordCount.font = "Hjet-Regular";
        this.swordCount.scale.set(3/4, 3/4);
        this.swordCount.visible = false;

        this.potionSprite = this.add.sprite(this.POTION_KEY, HW3Layers.UI);
        this.potionSprite.position.copy(new Vec2(240, 235));
        this.potionSprite.scale.set(11/24, 11/24);
        this.potionSprite.visible = false;

        this.potionCount = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.UI, {position: new Vec2(225, 220), text: "" + this.potions});
        this.potionCount.textColor = Color.BLACK;
        this.potionCount.font = "Hjet-Regular";
        this.potionCount.scale.set(3/4, 3/4);
        this.potionCount.visible = false;

        // Quest UI
        this.QuestSprite = this.add.sprite(this.QUEST_KEY, HW3Layers.UI);
        this.QuestSprite.position.copy(new Vec2(490, 200));
        this.QuestSprite.scale.set(1, 1);
        this.QuestSprite.visible = false;

        // Pause UI
        this.pauseSprite = this.add.sprite(this.PAUSE_KEY, HW3Layers.UI);
        this.pauseSprite.position.copy(new Vec2(300, 200));
        this.pauseSprite.scale.set(1, 1);
        this.pauseSprite.visible = false;

        this.menuButton = <Button> this.add.uiElement(UIElementType.BUTTON, HW3Layers.UI, {
            position: new Vec2(300, 180),
            text: "Menu"
        });
        this.menuButton.size.set(140, 40);
        this.menuButton.borderWidth = 4;
        this.menuButton.borderColor = new Color(118, 91, 53);
        this.menuButton.backgroundColor = Color.TRANSPARENT;
        this.menuButton.font = "Hjet-Regular";
        this.menuButton.textColor = Color.BLACK;
        this.menuButton.fontSize = 28;
        this.menuButton.visible = false;
        // zoom is 2 which messes everything up in wolfie2d so ill make dummy buttons
        this.menuButtonDummy = <Button> this.add.uiElement(UIElementType.BUTTON, HW3Layers.UI, {
            position: new Vec2(600, 360),
            text: ""
        });
        this.menuButtonDummy.size.set(140, 40);
        this.menuButtonDummy.borderColor = Color.TRANSPARENT;
        this.menuButtonDummy.backgroundColor = Color.TRANSPARENT;
        this.menuButtonDummy.visible = false;
        this.menuButtonDummy.onClick = () => {
            this.sceneManager.changeToScene(MainMenu);
        }

        this.resumeButton = <Button> this.add.uiElement(UIElementType.BUTTON, HW3Layers.UI, {
            position: new Vec2(300, 220),
            text: "Resume"
        });
        this.resumeButton.size.set(140, 40);
        this.resumeButton.borderWidth = 4;
        this.resumeButton.borderColor = new Color(118, 91, 53);
        this.resumeButton.backgroundColor = Color.TRANSPARENT;
        this.resumeButton.font = "Hjet-Regular";
        this.resumeButton.textColor = Color.BLACK;
        this.resumeButton.fontSize = 28;
        this.resumeButton.visible = false;
        // zoom is 2 which messes everything up in wolfie2d so ill make dummy buttons
        this.resumeButtonDummy = <Button> this.add.uiElement(UIElementType.BUTTON, HW3Layers.UI, {
            position: new Vec2(600, 440),
            text: ""
        });
        this.resumeButtonDummy.size.set(140, 40);
        this.resumeButtonDummy.borderColor = Color.TRANSPARENT;
        this.resumeButtonDummy.backgroundColor = Color.TRANSPARENT;
        this.resumeButtonDummy.visible = false;
        this.resumeButtonDummy.onClickEventId = HW3Events.GAME_PAUSE;

         // End of level label (start off screen)
        this.levelEndLabel = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.UI, { position: new Vec2(-300, 100), text: "Level Complete" });
        this.levelEndLabel.size.set(1200, 60);
        this.levelEndLabel.borderRadius = 0;
        this.levelEndLabel.backgroundColor = new Color(34, 32, 52);
        this.levelEndLabel.textColor = Color.WHITE;
        this.levelEndLabel.fontSize = 48;
        this.levelEndLabel.font = "PixelSimple";

        // Add a tween to move the label on screen
        this.levelEndLabel.tweens.add("slideIn", {
            startDelay: 0,
            duration: 1000,
            effects: [
                {
                    property: TweenableProperties.posX,
                    start: -300,
                    end: 150,
                    ease: EaseFunctionType.OUT_SINE
                }
            ]
        }); 
        
        this.levelTransitionScreen = <Rect>this.add.graphic(GraphicType.RECT, HW3Layers.UI, { position: new Vec2(300, 200), size: new Vec2(600, 400) });
        this.levelTransitionScreen.color = new Color(34, 32, 52);
        this.levelTransitionScreen.alpha = 1;

        this.levelTransitionScreen.tweens.add("fadeIn", {
            startDelay: 0,
            duration: 1000,
            effects: [
                {
                    property: TweenableProperties.alpha,
                    start: 0,
                    end: 1,
                    ease: EaseFunctionType.IN_OUT_QUAD
                }
            ],
            onEnd: HW3Events.LEVEL_END
        });

        /*
             Adds a tween to fade in the start of the level. After the tween has
             finished playing, a level start event gets sent to the EventQueue.
        */
        this.levelTransitionScreen.tweens.add("fadeOut", {
            startDelay: 0,
            duration: 1000,
            effects: [
                {
                    property: TweenableProperties.alpha,
                    start: 1,
                    end: 0,
                    ease: EaseFunctionType.IN_OUT_QUAD
                }
            ],
            onEnd: HW3Events.LEVEL_START
        });
    }
    /**
     * Initializes the particles system used by the player's weapon.
     */
    // protected initializeWeaponSystem(): void {
    //     this.playerWeaponSystem = new PlayerWeapon(50, Vec2.ZERO, 1000, 3, 0, 50);
    //     this.playerWeaponSystem.initializePool(this, HW3Layers.PRIMARY);
    // }
    /**
     * Initializes the player, setting the player's initial position to the given position.
     * @param position the player's spawn position
     */
    protected initializePlayer(key: string): void {
        // if (this.playerWeaponSystem === undefined) {
        //     throw new Error("Player weapon system must be initialized before initializing the player!");
        // }
        if (this.playerSpawn === undefined) {
            throw new Error("Player spawn must be set before initializing the player!");
        }

        // Add the player to the scene
        this.player = this.add.animatedSprite(key, HW3Layers.PRIMARY);
        this.player.scale.set(1, 1);
        this.player.position.copy(this.playerSpawn);
        // this.player.visible = false;
        
        
        // Give the player physics
        console.log(this.player.position.clone().x,this.player.position.clone().y)
        this.player.addPhysics(new AABB(this.player.position.clone(), this.player.boundary.getHalfSize().clone()));
        this.player.collisionShape.halfSize.set(20,this.player.collisionShape.halfSize.y-7);
        console.log(this.player.collisionShape.halfSize.x,this.player.collisionShape.halfSize.y);
        this.player.setGroup(HW3PhysicsGroups.PLAYER);
        
       
        
        // Give the player a death animation
        this.player.tweens.add(PlayerTweens.DEATH, {
            startDelay: 0,
            duration: 2400,
            effects: [],
            onEnd: HW3Events.PLAYER_DEAD
        });

       

        // Give the player it's AI
        this.player.addAI(PlayerController, { 
            weaponSystem: this.playerWeaponSystem, 
            tilemap: "Destructable" 
        });
    }

    protected initializeBoss(key:string, spawn:Vec2,AggroRadius:number): HW3AnimatedSprite{
        if (spawn === undefined) {
            throw new Error("Boss spawn must be set before initializing the boss!");
        }
        let boss = this.add.animatedSprite(key, HW3Layers.PRIMARY);
        // Add the player to the scene
        boss.addPhysics(new AABB(boss.position.clone(), boss.boundary.getHalfSize().clone()));
        boss.collisionShape.halfSize.set(boss.collisionShape.halfSize.x-20,boss.collisionShape.halfSize.y-20);
        boss.scale.set(1, 1);
        boss.position.copy(spawn);
        boss.setGroup(HW3PhysicsGroups.BOSS);
        
        
        return boss;
        
        // Give the player a death animation
        // this.player.tweens.add(PlayerTweens.DEATH, {
        //     startDelay: 0,
        //     duration: 1900,
        //     effects: [],
        //     onEnd: HW3Events.PLAYER_DEAD
        // });

       

        // Give the player it's AI
        // this.player.addAI(PlayerController, { 
        //     weaponSystem: this.playerWeaponSystem, 
        //     tilemap: "Destructable" 
        // });
    }

    protected initializeNPC(npc:HW3AnimatedSprite, key:string, spawn:Vec2, quests:Array<string>, order: number): HW3AnimatedSprite {
        if (spawn === undefined) {
            throw new Error("NPC spawn must be set before initializing!");
        }

        // Add the NPC to the scene
        npc = this.add.animatedSprite(key, HW3Layers.PRIMARY);
        npc.scale.set(1/2, 1/2);
        npc.position.copy(spawn);
        npc.disablePhysics();

        // Give the NPC it's AI
        npc.addAI(NPCController, {player: this.player, quests: quests, id: order});

        return npc;
        
    }

    protected initializeEnemy(key:string, spawn:Vec2, AggroRadius:number): HW3AnimatedSprite {
        if (spawn === undefined) {
            throw new Error("Enemy spawn must be set before initializing!");
        }

        // Add the Enemy to the scene
        let enemy = this.add.animatedSprite(key, HW3Layers.PRIMARY);
        enemy.scale.set(1/2, 1/2);
        enemy.position.copy(spawn);

        // Give the enemy physics
        enemy.addPhysics(new AABB(enemy.position.clone(), enemy.boundary.getHalfSize().clone()));
        enemy.collisionShape.halfSize.set(20,enemy.collisionShape.halfSize.y);
        enemy.setGroup(HW3PhysicsGroups.ENEMY);

        // Give the Enemy it's AI
        enemy.addAI(EnemyController, { player: this.player, radius: AggroRadius, spawn: spawn });
        console.log(enemy.id);

        return enemy
    }
    protected initializeLaser(key:string, spawn:Vec2): HW3AnimatedSprite{
        if(spawn == undefined){
            throw new Error("Portal must be set before initialiing!");
        }
        let laser = this.add.animatedSprite(key,HW3Layers.PRIMARY);
        laser.scale.set(1,1);
        laser.position.copy(spawn);
        return laser;
    }
    protected initializeSpikes(key:string, spawn: Vec2): HW3AnimatedSprite{
        if(spawn == undefined){
            throw new Error("Portal must be set before initialiing!");
        }
        let spike = this.add.animatedSprite(key,HW3Layers.PRIMARY);
        spike.scale.set(3,2);
        spike.position.copy(spawn);
        return spike;
    }
    protected initializePortal(key:string,spawn:Vec2): HW3AnimatedSprite{
        if(spawn == undefined){
            throw new Error("Portal must be set before initialiing!");
        }
        let portal = this.add.animatedSprite(key,HW3Layers.PRIMARY);
        portal.scale.set(1.5,1.5);
        portal.position.copy(spawn);
        portal.addPhysics(new AABB(spawn,portal.boundary.getHalfSize().clone()),undefined, false,true);
        portal.setTrigger(HW3PhysicsGroups.PLAYER,HW3Events.PLAYER_ENTERED_LEVEL_END,null);

        return portal;

    }
    protected initializeIndicator(key:string, spawn: Vec2): Sprite{
        if(spawn == undefined){
            throw new Error("Indicator must be set before initialiing!");
        }
        let indicator = this.add.sprite(key,HW3Layers.PRIMARY);
        
        indicator.position.copy(spawn);
        indicator.scale.set(1,1);
        indicator.alpha = 0.5;
        

        return indicator;
    }
    /**
     * Initializes the viewport
     */
    protected initializeViewport(): void {
        if (this.player === undefined) {
            throw new Error("Player must be initialized before setting the viewport to folow the player");
        }
        this.viewport.follow(this.player);
        this.viewport.setZoomLevel(2);
        this.viewport.setBounds(48, 0, 2368, 1600);
    }
    /**
     * Initializes the level end area
     */
    // protected initializeLevelEnds(): void {
    //     if (!this.layers.has(HW3Layers.PRIMARY)) {
    //         throw new Error("Can't initialize the level ends until the primary layer has been added to the scene!");
    //     }
        
    //     this.levelEndArea = <Rect>this.add.graphic(GraphicType.RECT, HW3Layers.PRIMARY, { position: this.levelEndPosition, size: this.levelEndHalfSize });
    //     this.levelEndArea.addPhysics(this.levelEndArea.collisionShape,undefined, false,true);
    //     this.levelEndArea.setTrigger(HW3PhysicsGroups.PLAYER, HW3Events.PLAYER_ENTERED_LEVEL_END, null);
    //     this.levelEndArea.color = new Color(255, 0, 255, .20);
    // }

    public loadScene(): void {
        // init
        this.isPaused = false;

        // get data from sessionStorage
        // if it's Nan, then init the count, otherwise load in the count
        let goblinKillcount = parseInt(sessionStorage.getItem("goblinsKilled"));
        this.goblinsKilled = isNaN(goblinKillcount) ? 0 : goblinKillcount;

        let jellyKillcount = parseInt(sessionStorage.getItem("jelliesKilled"));
        this.jelliesKilled = isNaN(jellyKillcount) ? 0 : jellyKillcount;

        let swordKillcount = parseInt(sessionStorage.getItem("swordsKilled"));
        this.swordsKilled = isNaN(swordKillcount) ? 0 : swordKillcount;

        this.potions = 5;
    }
    public unloadScene(): void {
        // save kill counts into storage
        sessionStorage.setItem("goblinsKilled", this.goblinsKilled.toString());
        sessionStorage.setItem("jelliesKilled", this.jelliesKilled.toString());
        sessionStorage.setItem("swordsKilled", this.swordsKilled.toString());
    }

    /* Misc methods */

    // Get the key of the player's jump audio file
    public getSpawnAudioKey():string{
        return this.spawnAudioKey;
    }
    public getJumpAudioKey(): string {
        return this.jumpAudioKey
    }
    public getDeathSoundKey():string{
        return this.deathSoundKey
    }
    public getHitSoundKey():string{
        return this.hitKey
    }
    public getSwingSoundKey():string{
        return this.swingKey;
    }
    public getplayerHurtSoundKey():string{
        return this.playerHurtSoundKey;
    }
    public getplayerDeathSoundKey():string{
        return this.playerDeathSoundKey;
    }
    
    protected handleCheat1(): void {
        throw new Error("handleCheat1 wasn't implemented");
    }
    protected handleCheat2(): void {
        throw new Error("handleCheat2 wasn't implemented");
    }
    protected handleCheat3(): void {
        throw new Error("handleCheat3 wasn't implemented");
    }
    protected handleCheat4(): void {
        throw new Error("handleCheat4 wasn't implemented");
    }
    protected handleCheat5(): void {
        throw new Error("handleCheat5 wasn't implemented");
    }

    protected handleTalkingNPC(questID: string, npcID: number, isSubmitting: boolean): void {
        throw new Error("handleTalkingNPC wasn't implemented in Hub.ts");
    }
    protected clearQuestUI(): void {
        throw new Error("clearQuestUI wasn't implemented in Hub.ts");
    }
    protected handleSmallTalkNPC(position: Vec2, text: string): void {
        throw new Error("handleSmallTalkNPC wasn't implemented");
    }
    protected handleSubmitSuccess(subtract:Array<string>): void {
        this.goblinsKilled -= parseInt(subtract[0]);
        this.goblinCount.destroy;
        this.goblinCount = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.UI, {position: new Vec2(225, 167), text: "" + this.goblinsKilled});
        this.goblinCount.visible = false;

        this.swordsKilled -= parseInt(subtract[1]);
        this.swordCount.destroy;
        this.swordCount = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.UI, {position: new Vec2(343, 167), text: "" + this.swordsKilled});
        this.swordCount.visible = false;

        this.jelliesKilled -= parseInt(subtract[2]);
        this.jellyCount.destroy;
        this.jellyCount = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.UI, {position: new Vec2(282, 167), text: "" + this.jelliesKilled});
        this.jellyCount.visible = false;
        
    }

    protected handleEnemyKilled(event: GameEvent): void {
        console.log(event.data.get("enemyType"));
        if (event.data.get("enemyType") == "goblin") {
            this.goblinsKilled += 1;
            this.goblinCount.destroy;
            this.goblinCount = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.UI, {position: new Vec2(225, 167), text: "" + this.goblinsKilled});
            this.goblinCount.visible = false;
        }
        if (event.data.get("enemyType") == "Ocher Jelly") {
            this.jelliesKilled += 1;
            this.jellyCount.destroy;
            this.jellyCount = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.UI, {position: new Vec2(282, 167), text: "" + this.jelliesKilled});
            this.jellyCount.visible = false;
        }
        if (event.data.get("enemyType") == "Flying Sword") {
            this.swordsKilled += 1;
            this.swordCount.destroy;
            this.swordCount = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.UI, {position: new Vec2(343, 167), text: "" + this.swordsKilled});
            this.swordCount.visible = false;
        }
    }

    protected handleGamePause(): void {
        // console.log(this.isRunning());
        // if (this.isRunning() === true) {
        //     this.setRunning(false);
        // }
        // else {
        //     this.setRunning(true);
        // }
        // console.log(this.isRunning());

        let nodes = this.getLayer(HW3Layers.PRIMARY).getItems();
        if (this.isPaused) {
            for (let node of nodes) {
                node.unfreeze();
                if (node instanceof HW3AnimatedSprite) {
                    node.animation.resume();
                }
            }
            Input.enableKeyboardInput();
            this.pauseSprite.visible = false;
            this.menuButton.visible = false;
            this.menuButtonDummy.visible = false;
            this.resumeButton.visible = false;
            this.resumeButtonDummy.visible = false; 
        }
        else {
            for (let node of nodes) {
                node.freeze();
                if (node instanceof HW3AnimatedSprite) {
                    node.animation.pause();
                }
            }
            Input.disableKeyboardInput();
            this.pauseSprite.visible = true;
            this.menuButton.visible = true;
            this.menuButtonDummy.visible = true;
            this.resumeButton.visible = true;
            this.resumeButtonDummy.visible = true; 
        }
   
        this.isPaused = !this.isPaused;
    }
}