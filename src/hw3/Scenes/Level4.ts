import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import HW3Level from "./HW3Level";

import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";
import Viewport from "../../Wolfie2D/SceneGraph/Viewport";

import HW4Level5 from "./Level5";
import HW3AnimatedSprite from "../Nodes/HW3AnimatedSprite";
import Hub from "./Hub";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import { PortalAnimation } from "../Portal/Portal";
import Level1 from "./HW3Level1";
import Level2 from "./HW3Level2";
import Level3 from "./Level3";
import Level5 from "./Level5";

/**
 * The first level for HW4 - should be the one with the grass and the clouds.
 */
export default class Level4 extends HW3Level {

    public static readonly PLAYER_SPAWN = new Vec2(64, 1225);
    public static readonly PLAYER_SPRITE_KEY = "PLAYER_SPRITE_KEY";
    public static readonly PLAYER_SPRITE_PATH = "game_assets/spritesheets/pyke_tallus.json";
    public static readonly TILEMAP_KEY = "Level4";
    public static readonly TILEMAP_PATH = "game_assets/tilemaps/Level3&4_2.json";
    public static readonly TILEMAP_SCALE = new Vec2(2, 2);
    public static readonly PLATFORM_LAYER_KEY = "Platform";
    public static readonly WALLS_LAYER_KEY = "Ground";

    public static readonly LEVEL_MUSIC_KEY = "LEVEL_MUSIC";
    public static readonly LEVEL_MUSIC_PATH = "game_assets/music/level4.wav";

    public static readonly JUMP_AUDIO_KEY = "PLAYER_JUMP";
    public static readonly JUMP_AUDIO_PATH = "game_assets/sounds/jump.wav";

    public static readonly TILE_DESTROYED_KEY = "TILE_DESTROYED";
    public static readonly TILE_DESTROYED_PATH = "hw4_assets/sounds/switch.wav";

    public static readonly DEATH_KEY = "DEATH";
    public static readonly DEATH_PATH = "game_assets/sounds/deathsound.mp3";

    public static readonly HIT_KEY = "HIT";
    public static readonly HIT_PATH = "game_assets/sounds/gettinghit.wav";

    public static readonly SWING_KEY = "SWING";
    public static readonly SWING_PATH = "game_assets/sounds/swing.wav";

    public static readonly PLAYER_DEATH_KEY = "PLAYER_DEATH";
    public static readonly PLAYER_DEATH_PATH = "game_assets/sounds/playerdeath.wav";

    public static readonly PLAYER_HURT_KEY = "PLAYER_HURT";
    public static readonly PLAYER_HURT_PATH = "game_assets/sounds/hurtPlayer.wav";

    // Game UI Sprites
    public static readonly HP_KEY = "HEALTH";
    public static readonly HP_PATH = "game_assets/sprites/HP_Bar.png";
    public static readonly BOSS_HP_KEY = "BOSS_HEALTH";
    public static readonly BOSS_HP_PATH = "game_assets/sprites/Boss_HP_Bar.png"
    public static readonly INV_KEY = "INVENTORY";
    public static readonly INV_PATH = "game_assets/sprites/Inventory.png";
    public static readonly GOBLINSKULL_KEY = "GOBLINSKULL_SPRITE_KEY";
    public static readonly GOBLINSKULL_PATH = "game_assets/sprites/Goblin_Skull.png";
    public static readonly JELLYHEART_KEY = "JELLYHEART_SPRITE_KEY";
    public static readonly JELLYHEART_PATH = "game_assets/sprites/Jelly_Heart.png";
    public static readonly SWORDRUBY_KEY = "SWORDRUBY_SPRITE_KEY";
    public static readonly SWORDRUBY_PATH = "game_assets/sprites/Sword_Ruby.png";
    public static readonly QUEST_KEY = "QUEST_KEY";
    public static readonly QUEST_PATH = "game_assets/sprites/Questbox.png";
    public static readonly PAUSE_KEY = "PAUSE_KEY";
    public static readonly PAUSE_PATH = "game_assets/sprites/PauseMenu.png";
    

    // Enemy Sprites
    public static readonly ENEMY_DEFAULT_SPAWN = new Vec2(200, 1216);
    protected defaultSpawn: Vec2;
    public static readonly JELLY_SPRITE_KEY = "JELLY_SPRITE_KEY";
    public static readonly JELLY_SPRITE_PATH = "game_assets/spritesheets/ocher_jelly.json";
    protected jellySpriteKey: string;
    public static readonly GOBLIN_SPRITE_KEY = "GOBLIN_SPRITE_KEY";
    public static readonly GOBLIN_SPRITE_PATH = "game_assets/spritesheets/goblin.json";
    protected goblinSpriteKey: string;
    public static readonly SWORD_SPRITE_KEY = "DEMON_SPRITE_KEY";
    public static readonly SWORD_SPRITE_PATH = "game_assets/spritesheets/flying_sword.json";
    protected swordSpriteKey: string;

    //Portal
    public static readonly PORTAL_SPAWN = new Vec2(2300, 1210);
    public static readonly PORTAL_KEY = "PORTAL_KEY";
    public static readonly PORTAL_PATH = "game_assets/spritesheets/portal.json";
    protected portal: HW3AnimatedSprite;
    protected portalSpriteKey:string;
    protected portalSpawn: Vec2;

    public static readonly LEVEL_END = new AABB(new Vec2(224, 232), new Vec2(24, 16));

    public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, options);

        // Set the keys for the different layers of the INDICATOR_KEY
        this.tilemapKey = Level4.TILEMAP_KEY;
        this.tilemapScale = Level4.TILEMAP_SCALE;
        this.platformLayerKey = Level4.PLATFORM_LAYER_KEY;
        this.wallsLayerKey = Level4.WALLS_LAYER_KEY;
        
        // Set the key for the player's sprite
        this.playerSpriteKey = Level4.PLAYER_SPRITE_KEY;
        // Set the player's spawn
        this.playerSpawn = Level4.PLAYER_SPAWN;

        // Music and sound
        this.levelMusicKey = Level4.LEVEL_MUSIC_KEY
        this.jumpAudioKey = Level4.JUMP_AUDIO_KEY;
        this.tileDestroyedAudioKey = Level4.TILE_DESTROYED_KEY;
        this.deathSoundKey = Level4.DEATH_KEY;
        this.hitKey = Level4.HIT_KEY;
        this.swingKey = Level4.SWING_KEY;
        this.playerDeathSoundKey = Level4.PLAYER_DEATH_KEY;
        this.playerHurtSoundKey = Level4.PLAYER_HURT_KEY;

        // Sprites
        this.HP_KEY = Level4.HP_KEY;
        this.BOSS_HP_KEY = Level4.BOSS_HP_KEY;
        this.INV_KEY = Level4.INV_KEY;
        this.GOBLINSKULL_KEY = Level4.GOBLINSKULL_KEY;
        this.JELLYHEART_KEY = Level4.JELLYHEART_KEY;
        this.SWORDRUBY_KEY = Level4.SWORDRUBY_KEY;
        this.QUEST_KEY = Level4.QUEST_KEY
        this.PAUSE_KEY = Level4.PAUSE_KEY;
        
        // Set Enemy sprites and spawns
        this.jellySpriteKey = Level4.JELLY_SPRITE_KEY;
        this.goblinSpriteKey = Level4.GOBLIN_SPRITE_KEY;
        this.swordSpriteKey = Level4.SWORD_SPRITE_KEY;
        this.defaultSpawn = Level4.ENEMY_DEFAULT_SPAWN;

        // Set Portal sprite and spawn
        this.portalSpriteKey = Level4.PORTAL_KEY;
        this.portalSpawn = Level4.PORTAL_SPAWN;

        // Level end size and position
        this.levelEndPosition = new Vec2(128, 232).mult(this.tilemapScale);
        this.levelEndHalfSize = new Vec2(32, 32).mult(this.tilemapScale);

    }

    /**
     * Load in our resources for level 3
     */
    public loadScene(): void {
        super.loadScene();
        // Load in the tilemap
        this.load.tilemap(this.tilemapKey, Level4.TILEMAP_PATH);
        // Load in the player's sprite
        this.load.spritesheet(this.playerSpriteKey, Level4.PLAYER_SPRITE_PATH);
        // Audio and music
        this.load.audio(this.levelMusicKey, Level4.LEVEL_MUSIC_PATH);
        this.load.audio(this.jumpAudioKey, Level4.JUMP_AUDIO_PATH);
        this.load.audio(this.tileDestroyedAudioKey, Level4.TILE_DESTROYED_PATH);
        this.load.audio(this.deathSoundKey,Level4.DEATH_PATH);
        this.load.audio(this.hitKey,Level4.HIT_PATH);
        this.load.audio(this.swingKey, Level4.SWING_PATH);
        this.load.audio(this.playerHurtSoundKey, Level4.PLAYER_HURT_PATH);
        this.load.audio(this.playerDeathSoundKey, Level4.PLAYER_DEATH_PATH);
        // Game UI sprites
        this.load.image(this.HP_KEY, Level4.HP_PATH);
        this.load.image(this.BOSS_HP_KEY,Level4.BOSS_HP_PATH);
        this.load.image(this.INV_KEY,Level4.INV_PATH);
        this.load.image(this.GOBLINSKULL_KEY, Level4.GOBLINSKULL_PATH);
        this.load.image(this.JELLYHEART_KEY, Level4.JELLYHEART_PATH);
        this.load.image(this.SWORDRUBY_KEY, Level4.SWORDRUBY_PATH);
        this.load.image(this.QUEST_KEY, Level4.QUEST_PATH);
        this.load.image(this.PAUSE_KEY, Level4.PAUSE_PATH);

        // Load in Enemy sprites
        this.load.spritesheet(this.jellySpriteKey, Level4.JELLY_SPRITE_PATH);
        this.load.spritesheet(this.goblinSpriteKey, Level4.GOBLIN_SPRITE_PATH);
        this.load.spritesheet(this.swordSpriteKey, Level4.SWORD_SPRITE_PATH);
        this.load.spritesheet(this.portalSpriteKey, Level4.PORTAL_PATH);
    }

    /**
     * Unload resources for level 3
     */
    public unloadScene(): void {
        super.unloadScene();
        // // TODO decide which resources to keep/cull 
        this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: this.levelMusicKey});
        // this.load.spritesheet(this.playerSpriteKey, Level4.PLAYER_SPRITE_PATH);
        // this.load.audio(this.jumpAudioKey, Level4.JUMP_AUDIO_PATH);
        // this.load.audio(this.tileDestroyedAudioKey, Level4.TILE_DESTROYED_PATH);
        // this.load.audio(this.deathSoundKey,Level4.DEATH_PATH);
        // this.load.audio(this.hitKey,Level4.HIT_PATH);

    }

    public startScene(): void {
        super.startScene();
        // Set the next level to be Level4
        this.nextLevel = Hub;

        this.initializeEnemies();
        this.portalInitialize();
    }

    protected initializeEnemies() {
        // initialize placeholder
        // can use this.defaultSpawn or define your own spawn
        this.initializeEnemy(this.jellySpriteKey, new Vec2(375, 1150), 10);
        this.initializeEnemy(this.jellySpriteKey, new Vec2(425, 1150), 10);
        this.initializeEnemy(this.goblinSpriteKey, new Vec2(750, 1150), 10);
        this.initializeEnemy(this.goblinSpriteKey, new Vec2(800, 1150), 10);
        this.initializeEnemy(this.jellySpriteKey, new Vec2(1000, 1150), 10);
        this.initializeEnemy(this.jellySpriteKey, new Vec2(1050, 1150), 10);
        this.initializeEnemy(this.swordSpriteKey, new Vec2(1200, 1216), 10);
        this.initializeEnemy(this.swordSpriteKey, new Vec2(1250, 1216), 10);
        this.initializeEnemy(this.jellySpriteKey, new Vec2(1550, 1216), 10);
        this.initializeEnemy(this.jellySpriteKey, new Vec2(1600, 1216), 10);
        this.initializeEnemy(this.goblinSpriteKey, new Vec2(1900, 1216), 10);
        this.initializeEnemy(this.goblinSpriteKey, new Vec2(2000, 1216), 10);
        this.initializeEnemy(this.swordSpriteKey, new Vec2(2100, 1216), 10);
        this.initializeEnemy(this.swordSpriteKey, new Vec2(2200, 1216), 10);
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