import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import HW3Level from "./HW3Level";
import MainMenu from "./MainMenu";

import Viewport from "../../Wolfie2D/SceneGraph/Viewport";
import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";

import NPCController from "../NPC/NPCController";
import HW3AnimatedSprite from "../Nodes/HW3AnimatedSprite";
import {HW3Layers} from "./HW3Level";
import { NPCEvents } from "../Events/NPCEvents";

// imports for quest displaying
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import UIElement from "../../Wolfie2D/Nodes/UIElement";
import Timer from "../../Wolfie2D/Timing/Timer";
import { Quests } from "../Text/Quests"
import { PortalAnimation } from "../Portal/Portal";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Level1 from "./HW3Level1";
import Level2 from "./HW3Level2";
import Level3 from "./Level3";
import Level4 from "./Level4";
import Level5 from "./Level5";

export default class Hub extends HW3Level {

    public static readonly PLAYER_SPAWN = new Vec2(64, 1225);
    public static readonly PLAYER_SPRITE_KEY = "PLAYER_SPRITE_KEY";
    public static readonly PLAYER_SPRITE_PATH = "game_assets/spritesheets/pyke_tallus.json";

    public static readonly TILEMAP_KEY = "HUB";
    public static readonly TILEMAP_PATH = "game_assets/tilemaps/Hub.json";
    public static readonly TILEMAP_SCALE = new Vec2(2, 2);
    public static readonly PLATFORM_LAYER_KEY = "Platform";
    public static readonly WALLS_LAYER_KEY = "Ground";

    // Audio and music
    public static readonly LEVEL_MUSIC_KEY = "LEVEL_MUSIC";
    public static readonly LEVEL_MUSIC_PATH = "game_assets/music/hub.wav";

    public static readonly JUMP_AUDIO_KEY = "PLAYER_JUMP";
    public static readonly JUMP_AUDIO_PATH = "game_assets/sounds/jump.wav";

    public static readonly TILE_DESTROYED_KEY = "TILE_DESTROYED";
    public static readonly TILE_DESTROYED_PATH = "game_assets/sounds/switch.wav";
    
    public static readonly DEATH_KEY = "DEATH";
    public static readonly DEATH_PATH = "game_assets/sounds/deathsound.mp3";

    public static readonly HIT_KEY = "HIT";
    public static readonly HIT_PATH = "game_assets/sounds/gettinghit.wav";

    // Game UI Sprites
    public static readonly HP_KEY = "HEALTH";
    public static readonly HP_PATH = "game_assets/sprites/HP_Bar.png";
    public static readonly INV_KEY = "INVENTORY";
    public static readonly INV_PATH = "game_assets/sprites/Inventory.png";
    public static readonly GOBLINSKULL_KEY = "GOBLINSKULL_SPRITE_KEY";
    public static readonly GOBLINSKULL_PATH = "game_assets/sprites/Goblin_Skull.png";
    public static readonly JELLYHEART_KEY = "JELLYHEART_SPRITE_KEY";
    public static readonly JELLYHEART_PATH = "game_assets/sprites/Jelly_Heart.png";

    // NPC Sprites
    public static readonly NPC_1_SPAWN = new Vec2(200, 1243);
    public static readonly NPC_1_SPRITE_KEY = "NPC_1_KEY";
    public static readonly NPC_1_SPRITE_PATH = "game_assets/spritesheets/NPC_1.json";

    public static readonly NPC_2_SPAWN = new Vec2(700, 1243);
    public static readonly NPC_2_SPRITE_KEY = "NPC_2_KEY";
    public static readonly NPC_2_SPRITE_PATH = "game_assets/spritesheets/NPC_2.json";

    public static readonly NPC_3_SPAWN = new Vec2(1100, 1243);
    public static readonly NPC_3_SPRITE_KEY = "NPC_3_KEY";
    public static readonly NPC_3_SPRITE_PATH = "game_assets/spritesheets/NPC_3.json";

    public static readonly NPC_4_SPAWN = new Vec2(1700, 1243);
    public static readonly NPC_4_SPRITE_KEY = "NPC_4_KEY";
    public static readonly NPC_4_SPRITE_PATH = "game_assets/spritesheets/NPC_4.json";

     //Portal
    public static readonly PORTAL_SPAWN = new Vec2(2300, 1210);
    public static readonly PORTAL_KEY = "PORTAL_KEY";
    public static readonly PORTAL_PATH = "game_assets/spritesheets/portal.json";

    protected NPC_1: HW3AnimatedSprite
    protected NPC_1_SpriteKey: string;
    protected NPC_1_Spawn: Vec2;

    protected NPC_2: HW3AnimatedSprite
    protected NPC_2_SpriteKey: string;
    protected NPC_2_Spawn: Vec2;

    protected NPC_3: HW3AnimatedSprite
    protected NPC_3_SpriteKey: string;
    protected NPC_3_Spawn: Vec2;

    protected NPC_4: HW3AnimatedSprite
    protected NPC_4_SpriteKey: string;
    protected NPC_4_Spawn: Vec2;

    protected portal: HW3AnimatedSprite;
    protected portalSpriteKey:string;
    protected portalSpawn: Vec2;

    public static readonly LEVEL_END = new AABB(new Vec2(224, 232), new Vec2(24, 16));

    // Variables
    private isDisplayingText: Boolean;
    private displayTimer: Timer;
    private textBuffer: Array<string>;
    private prevText: UIElement

    public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, options);

        // Set the keys for the different layers of the tilemap
        this.tilemapKey = Hub.TILEMAP_KEY;
        this.tilemapScale = Hub.TILEMAP_SCALE;
        this.platformLayerKey = Hub.PLATFORM_LAYER_KEY;
        this.wallsLayerKey = Hub.WALLS_LAYER_KEY;

        // Set the key for the player's sprite
        this.playerSpriteKey = Hub.PLAYER_SPRITE_KEY;
        // Set the player's spawn
        this.playerSpawn = Hub.PLAYER_SPAWN;

        // Music and sound
        this.levelMusicKey = Hub.LEVEL_MUSIC_KEY
        this.jumpAudioKey = Hub.JUMP_AUDIO_KEY;
        this.tileDestroyedAudioKey = Hub.TILE_DESTROYED_KEY;
        this.deathSoundKey = Hub.DEATH_KEY;
        this.hitKey = Hub.HIT_KEY;

        // Sprites
        this.HP_KEY = Hub.HP_KEY;
        this.INV_KEY = Hub.INV_KEY;
        this.GOBLINSKULL_KEY = Hub.GOBLINSKULL_KEY;
        this.JELLYHEART_KEY = Hub.JELLYHEART_KEY;

         // Set Portal sprite and spawn
        this.portalSpriteKey = Hub.PORTAL_KEY;
        this.portalSpawn = Hub.PORTAL_SPAWN;

        // Set NPC sprites and spawns
        this.NPC_1_SpriteKey = Hub.NPC_1_SPRITE_KEY;
        this.NPC_1_Spawn = Hub.NPC_1_SPAWN

        this.NPC_2_SpriteKey = Hub.NPC_2_SPRITE_KEY;
        this.NPC_2_Spawn = Hub.NPC_2_SPAWN

        this.NPC_3_SpriteKey = Hub.NPC_3_SPRITE_KEY;
        this.NPC_3_Spawn = Hub.NPC_3_SPAWN

        this.NPC_4_SpriteKey = Hub.NPC_4_SPRITE_KEY;
        this.NPC_4_Spawn = Hub.NPC_4_SPAWN

        // Level end size and position
        this.levelEndPosition = new Vec2(32, 216).mult(this.tilemapScale);
        this.levelEndHalfSize = new Vec2(32, 32).mult(this.tilemapScale);

        // Set variables for displaying text
        this.isDisplayingText = false;
        this.displayTimer = new Timer(500);

    }
    /**
     * Load in resources for level 4.
     */
    public loadScene(): void {
        // Load in the tilemap
        this.load.tilemap(this.tilemapKey, Hub.TILEMAP_PATH);
        // Load in the player's sprite
        this.load.spritesheet(this.playerSpriteKey, Hub.PLAYER_SPRITE_PATH);
        // Audio and music
        this.load.audio(this.levelMusicKey, Hub.LEVEL_MUSIC_PATH);
        this.load.audio(this.jumpAudioKey, Hub.JUMP_AUDIO_PATH);
        this.load.audio(this.tileDestroyedAudioKey, Hub.TILE_DESTROYED_PATH);
        this.load.audio(this.deathSoundKey,Hub.DEATH_PATH);
        this.load.audio(this.hitKey,Hub.HIT_PATH);
        // Game UI sprites
        this.load.image(this.HP_KEY, Hub.HP_PATH);
        this.load.image(this.INV_KEY, Hub.INV_PATH);
        this.load.image(this.GOBLINSKULL_KEY, Hub.GOBLINSKULL_PATH);
        this.load.image(this.JELLYHEART_KEY, Hub.JELLYHEART_PATH);
        // Load in NPC sprites
        this.load.spritesheet(this.NPC_1_SpriteKey, Hub.NPC_1_SPRITE_PATH);
        this.load.spritesheet(this.NPC_2_SpriteKey, Hub.NPC_2_SPRITE_PATH);
        this.load.spritesheet(this.NPC_3_SpriteKey, Hub.NPC_3_SPRITE_PATH);
        this.load.spritesheet(this.NPC_4_SpriteKey, Hub.NPC_4_SPRITE_PATH);
        this.load.spritesheet(this.portalSpriteKey,Hub.PORTAL_PATH);
    }

    public unloadScene(): void {
        this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: this.levelMusicKey});
    }

    public startScene(): void {
        super.startScene();
        this.nextLevel = MainMenu;

        this.initializeNPCs();
        this.portalInitialize();
    }

    public updateScene(deltaT: number) {
        super.updateScene(deltaT);

        if (this.isDisplayingText) {
            // display each sentence of the quest in a regular interval
            if (this.displayTimer.isStopped()) {
                this.prevText.destroy();

                if (this.textBuffer.length > 0) {
                    this.prevText = this.add.uiElement(UIElementType.LABEL, HW3Layers.UI, {
                        position: new Vec2(150, 100),
                        text: this.textBuffer.pop()
                    })
                    this.displayTimer.reset();
                    this.displayTimer.start(2500);
                }
                else {
                    this.isDisplayingText = false;
                    this.emitter.fireEvent(NPCEvents.DONE_TALKING_TO_NPC);
                }
            }
        }
    }


    // handle HW3Events.TALKING_TO_NPC
    protected handleTalkingNPC(id: string): void {
        // split the string into individual sentences.
        let re = /.*?[\.?!]/g;
        // replace newlines with space, then spaces that are more than 1 with a single space
        // then split and remove trailing whitespace, then reverse so we can pop easily
        this.textBuffer = Quests[id].replace(/\n/g, " ").replace(/ +/g, " ").match(re).map(x => x.trim()).reverse();
        this.textBuffer.splice(0, 0, "Will you accept my quest adventurer? (y) or (n)");

        this.prevText = this.add.uiElement(UIElementType.LABEL, HW3Layers.UI, {position: new Vec2(1, 1),text: ""});
        this.isDisplayingText = true;
        this.displayTimer.start();
    }

    // Quests should be in order from last -> first
    // ex: ["A", "B", "C"] will give out quests in order C -> B -> A
    protected initializeNPCs() {
        // initialize placeholder
        let placeholderQuests = ["A"]
        this.initializeNPC(this.NPC_1,this.NPC_1_SpriteKey, this.NPC_1_Spawn, placeholderQuests);
        
        this.initializeNPC(this.NPC_2,this.NPC_2_SpriteKey, this.NPC_2_Spawn, placeholderQuests);
        
        this.initializeNPC(this.NPC_3,this.NPC_3_SpriteKey, this.NPC_3_Spawn, placeholderQuests);
       
        this.initializeNPC(this.NPC_4,this.NPC_4_SpriteKey, this.NPC_4_Spawn, placeholderQuests);
        

    }

    protected initializeNPC(npc:HW3AnimatedSprite, key:string, spawn:Vec2, quests:Array<string>): void {
        if (spawn === undefined) {
            throw new Error("NPC spawn must be set before initializing!");
        }

        // Add the NPC to the scene
        npc = this.add.animatedSprite(key, HW3Layers.PRIMARY);
        npc.scale.set(1/2, 1/2);
        npc.position.copy(spawn);
        npc.disablePhysics();

        // Give the NPC it's AI
        npc.addAI(NPCController, {player: this.player, quests: quests});
        
    }

    protected handleCheat1(): void {
        this.sceneManager.changeToScene(Level1);
    }
    protected handleCheat2(): void {
        this.sceneManager.changeToScene(Level2);
    }
    protected handleCheat3(): void {
        this.sceneManager.changeToScene(Level3);
    }
    protected handleCheat4(): void {
        this.sceneManager.changeToScene(Level4);
    }
    protected handleCheat5(): void {
        this.sceneManager.changeToScene(Level5);
    }
    
    protected portalInitialize(){
        this.portal = this.initializePortal(this.portalSpriteKey,this.portalSpawn)
        this.portal.animation.play(PortalAnimation.IDLE);
    }
    protected initializeViewport(): void {
        super.initializeViewport();
        this.viewport.setBounds(32, 16, 2368, 1350);
    }

}