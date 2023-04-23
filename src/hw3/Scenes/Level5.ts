import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import HW3Level from "./HW3Level";

import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";
import Viewport from "../../Wolfie2D/SceneGraph/Viewport";

import HW3AnimatedSprite from "../Nodes/HW3AnimatedSprite";
import Hub from "./Hub";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";

/**
 * The first level for HW4 - should be the one with the grass and the clouds.
 */
export default class Level5 extends HW3Level {

    public static readonly PLAYER_SPAWN = new Vec2(64, 1225);;
    public static readonly PLAYER_SPRITE_KEY = "PLAYER_SPRITE_KEY";
    public static readonly PLAYER_SPRITE_PATH = "game_assets/spritesheets/pyke_tallus.json";

    public static readonly TILEMAP_KEY = "LEVEL1";
    public static readonly TILEMAP_PATH = "game_assets/tilemaps/bosslevel.json";
    public static readonly TILEMAP_SCALE = new Vec2(2, 2);
    public static readonly PLATFORM_LAYER_KEY = "Platform";
    public static readonly WALLS_LAYER_KEY = "Ground";

    public static readonly LEVEL_MUSIC_KEY = "LEVEL_MUSIC";
    public static readonly LEVEL_MUSIC_PATH = "game_assets/music/boss.wav";

    public static readonly JUMP_AUDIO_KEY = "PLAYER_JUMP";
    public static readonly JUMP_AUDIO_PATH = "game_assets/sounds/jump.wav";

    public static readonly TILE_DESTROYED_KEY = "TILE_DESTROYED";
    public static readonly TILE_DESTROYED_PATH = "hw4_assets/sounds/switch.wav";

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

    // Enemy Sprites

    public static readonly BOSS_SPAWN = new Vec2(500,1275)
    public static readonly BOSS_SPRITE_KEY = "BOSS_SPRITE_KEY";
    public static readonly BOSS_SPRITE_PATH = "game_assets/spritesheets/boss.json";
    protected bossSpawn: Vec2;
    protected boss:HW3AnimatedSprite;
    protected bossSpriteKey: string;


    public static readonly LEVEL_END = new AABB(new Vec2(224, 232), new Vec2(24, 16));

    public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, options);

        // Set the keys for the different layers of the tilemap
        this.tilemapKey = Level5.TILEMAP_KEY;
        this.tilemapScale = Level5.TILEMAP_SCALE;
        this.platformLayerKey = Level5.PLATFORM_LAYER_KEY;
        this.wallsLayerKey = Level5.WALLS_LAYER_KEY;
        
        // Set the key for the player's sprite
        this.playerSpriteKey = Level5.PLAYER_SPRITE_KEY;
        // Set the player's spawn
        this.playerSpawn = Level5.PLAYER_SPAWN;
        
        this.bossSpriteKey = Level5.BOSS_SPRITE_KEY;
        this.bossSpawn = Level5.BOSS_SPAWN;
        // Music and sound
        this.levelMusicKey = Level5.LEVEL_MUSIC_KEY
        this.jumpAudioKey = Level5.JUMP_AUDIO_KEY;
        this.tileDestroyedAudioKey = Level5.TILE_DESTROYED_KEY;
        this.deathSoundKey = Level5.DEATH_KEY;
        this.hitKey = Level5.HIT_KEY;

        // Sprites
        this.HP_KEY = Level5.HP_KEY;

        //Inventory
        this.INV_KEY = Level5.INV_KEY;

        // Level end size and position
        this.levelEndPosition = new Vec2(128, 232).mult(this.tilemapScale);
        this.levelEndHalfSize = new Vec2(32, 32).mult(this.tilemapScale);
    }

    /**
     * Load in our resources for level 1
     */
    public loadScene(): void {
        // Load in the tilemap
        this.load.tilemap(this.tilemapKey, Level5.TILEMAP_PATH);
        // Load in the player's sprite
        this.load.spritesheet(this.playerSpriteKey, Level5.PLAYER_SPRITE_PATH);

        this.load.spritesheet(this.bossSpriteKey,Level5.BOSS_SPRITE_PATH)
        // Audio and music
        this.load.audio(this.levelMusicKey, Level5.LEVEL_MUSIC_PATH);
        this.load.audio(this.jumpAudioKey, Level5.JUMP_AUDIO_PATH);
        this.load.audio(this.tileDestroyedAudioKey, Level5.TILE_DESTROYED_PATH);
        this.load.audio(this.deathSoundKey,Level5.DEATH_PATH);
        this.load.audio(this.hitKey,Level5.HIT_PATH);
        // Game UI sprites
        this.load.image(this.HP_KEY, Level5.HP_PATH);
        this.load.image(this.INV_KEY, Level5.INV_PATH);
        this.load.image(this.GOBLINSKULL_KEY, Level5.GOBLINSKULL_PATH);
        // Load in Enemy sprites
    }

    /**
     * Unload resources for level 1
     */
    public unloadScene(): void {
        // TODO decide which resources to keep/cull 
        this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: this.levelMusicKey});
        // // TODO decide which resources to keep/cull 
        // this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: this.levelMusicKey});
        // this.load.spritesheet(this.playerSpriteKey, Level1.PLAYER_SPRITE_PATH);
        // this.load.audio(this.jumpAudioKey, Level1.JUMP_AUDIO_PATH);
        // this.load.audio(this.tileDestroyedAudioKey, Level1.TILE_DESTROYED_PATH);
        // this.load.audio(this.deathSoundKey,Level1.DEATH_PATH);
        // this.load.audio(this.hitKey,Level1.HIT_PATH);

    }

    public startScene(): void {
        super.startScene();
        // Set the next level to be Level2
        this.initializeFinalBoss();
        this.nextLevel = Hub;

    }
    protected initializeFinalBoss(){
        this.boss = this.initializeBoss(this.bossSpriteKey,this.bossSpawn,5);
    }
  

    /**
     * I had to override this method to adjust the viewport for the first level. I screwed up 
     * when I was making the tilemap for the first level is what it boils down to.
     * 
     * - Peter
     */
    protected initializeViewport(): void {
        super.initializeViewport();
        this.viewport.setBounds(32, 16, 2368, 1600);
    }

}