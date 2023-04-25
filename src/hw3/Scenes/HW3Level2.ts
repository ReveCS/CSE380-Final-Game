import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import HW3Level from "./HW3Level";
import MainMenu from "./MainMenu";

import Viewport from "../../Wolfie2D/SceneGraph/Viewport";
import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";
import Hub from "./Hub";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import HW3AnimatedSprite from "../Nodes/HW3AnimatedSprite";
import { PortalAnimation } from "../Portal/Portal";
import Level1 from "./HW3Level1";
import Level3 from "./Level3";
import Level4 from "./Level4";
import Level5 from "./Level5";

/**
 * The second level for HW4. It should be the goose dungeon / cave.
 */
export default class Level2 extends HW3Level {

    public static readonly PLAYER_SPAWN = new Vec2(32, 1350);
    public static readonly PLAYER_SPRITE_KEY = "PLAYER_SPRITE_KEY";
    public static readonly PLAYER_SPRITE_PATH = "game_assets/spritesheets/pyke_tallus.json";

    public static readonly TILEMAP_KEY = "LEVEL2";
    public static readonly TILEMAP_PATH = "game_assets/tilemaps/Level2.json";
    public static readonly TILEMAP_SCALE = new Vec2(2, 2);
    public static readonly PLATFORM_LAYER_KEY = "Platform";
    public static readonly WALLS_LAYER_KEY = "Ground";

    public static readonly LEVEL_MUSIC_KEY = "LEVEL_MUSIC";
    public static readonly LEVEL_MUSIC_PATH = "game_assets/music/level2.wav";

    public static readonly JUMP_AUDIO_KEY = "PLAYER_JUMP";
    public static readonly JUMP_AUDIO_PATH = "hw4_assets/sounds/jump.wav";

    public static readonly TILE_DESTROYED_KEY = "TILE_DESTROYED";
    public static readonly TILE_DESTROYED_PATH = "hw4_assets/sounds/switch.wav";
    
    public static readonly DEATH_KEY = "DEATH";
    public static readonly DEATH_PATH = "game_assets/sounds/deathsound.mp3";

    public static readonly HIT_KEY = "HIT";
    public static readonly HIT_PATH = "game_assets/sounds/gettinghit.wav";

    public static readonly HP_KEY = "HEALTH";
    public static readonly HP_PATH = "game_assets/sprites/HP_Bar.png";
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

    //Portal
    public static readonly PORTAL_SPAWN = new Vec2(2300, 1369);
    public static readonly PORTAL_KEY = "PORTAL_KEY";
    public static readonly PORTAL_PATH = "game_assets/spritesheets/portal.json";
    protected portal: HW3AnimatedSprite;
    protected portalSpriteKey:string;
    protected portalSpawn: Vec2;

    // Enemy Sprites
    public static readonly ENEMY_DEFAULT_SPAWN = new Vec2(200, 1225);
    protected defaultSpawn: Vec2;
    
    public static readonly GOBLIN_SPRITE_KEY = "GOBLIN_SPRITE_KEY";
    public static readonly GOBLIN_SPRITE_PATH = "game_assets/spritesheets/goblin.json";
    protected goblinSpriteKey: string;

    public static readonly SWORD_SPRITE_KEY = "DEMON_SPRITE_KEY";
    public static readonly SWORD_SPRITE_PATH = "game_assets/spritesheets/flying_sword.json";
    protected swordSpriteKey: string;

    public static readonly LEVEL_END = new AABB(new Vec2(224, 232), new Vec2(24, 16));

    public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, options);

        // Set the keys for the different layers of the tilemap
        this.tilemapKey = Level2.TILEMAP_KEY;
        this.tilemapScale = Level2.TILEMAP_SCALE;
        this.platformLayerKey = Level2.PLATFORM_LAYER_KEY;
        this.wallsLayerKey = Level2.WALLS_LAYER_KEY;

        // Set the key for the player's sprite
        this.playerSpriteKey = Level2.PLAYER_SPRITE_KEY;
        // Set the player's spawn
        this.playerSpawn = Level2.PLAYER_SPAWN;

        // Music and sound
        this.levelMusicKey = Level2.LEVEL_MUSIC_KEY
        this.jumpAudioKey = Level2.JUMP_AUDIO_KEY;
        this.tileDestroyedAudioKey = Level2.TILE_DESTROYED_KEY;
        this.deathSoundKey = Level2.DEATH_KEY;
        this.hitKey = Level2.HIT_KEY;

        // Sprites
        this.HP_KEY = Level2.HP_KEY;
        this.INV_KEY = Level2.INV_KEY;
        this.GOBLINSKULL_KEY = Level2.GOBLINSKULL_KEY;
        this.JELLYHEART_KEY = Level2.JELLYHEART_KEY;
        this.SWORDRUBY_KEY = Level2.SWORDRUBY_KEY;
        this.QUEST_KEY = Level2.QUEST_KEY;

        // Set Enemy sprites and spawns
        this.goblinSpriteKey = Level2.GOBLIN_SPRITE_KEY;
        this.swordSpriteKey = Level2.SWORD_SPRITE_KEY;
        this.defaultSpawn = Level2.ENEMY_DEFAULT_SPAWN;

        // Set Portal sprite and spawn
        this.portalSpriteKey = Level2.PORTAL_KEY;
        this.portalSpawn = Level2.PORTAL_SPAWN;

        // Level end size and position
        this.levelEndPosition = new Vec2(128, 232).mult(this.tilemapScale);
        this.levelEndHalfSize = new Vec2(32, 32).mult(this.tilemapScale);

    }
    /**
     * Load in resources for level 2.
     */
    public loadScene(): void {
        // Load in the tilemap
        this.load.tilemap(this.tilemapKey, Level2.TILEMAP_PATH);
        // Load in the player's sprite
        this.load.spritesheet(this.playerSpriteKey, Level2.PLAYER_SPRITE_PATH);
        // Audio and music
        this.load.audio(this.levelMusicKey, Level2.LEVEL_MUSIC_PATH);
        this.load.audio(this.jumpAudioKey, Level2.JUMP_AUDIO_PATH);
        this.load.audio(this.tileDestroyedAudioKey, Level2.TILE_DESTROYED_PATH);
        this.load.audio(this.deathSoundKey,Level2.DEATH_PATH);
        this.load.audio(this.hitKey,Level2.HIT_PATH);
        // Game UI sprites
        this.load.image(this.HP_KEY, Level2.HP_PATH);
        this.load.image(this.INV_KEY, Level2.INV_PATH);
        this.load.image(this.GOBLINSKULL_KEY, Level2.GOBLINSKULL_PATH);
        this.load.image(this.JELLYHEART_KEY, Level2.JELLYHEART_PATH);
        this.load.image(this.SWORDRUBY_KEY, Level2.SWORDRUBY_PATH);
        this.load.image(this.QUEST_KEY, Level2.QUEST_PATH);
        // Load in Enemy sprites
        this.load.spritesheet(this.goblinSpriteKey, Level2.GOBLIN_SPRITE_PATH);
        this.load.spritesheet(this.swordSpriteKey, Level2.SWORD_SPRITE_PATH);
        this.load.spritesheet(this.portalSpriteKey,Level2.PORTAL_PATH);
    }

    public unloadScene(): void {
        // TODO decide which resources to keep/cull 
        this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: this.levelMusicKey});
    }

    public startScene(): void {
        super.startScene();
        this.nextLevel = Hub;

        this.initializeEnemies();
        this.portalInitialize();
    }

    protected initializeEnemies() {
        // initialize placeholder
        // can use this.defaultSpawn or define your own spawn
        this.initializeEnemy(this.goblinSpriteKey, new Vec2(500, 1408), 10);
        this.initializeEnemy(this.goblinSpriteKey, new Vec2(600, 1408), 10);
        this.initializeEnemy(this.goblinSpriteKey, new Vec2(700, 1408), 10);

        this.initializeEnemy(this.swordSpriteKey, new Vec2(800, 1408), 10);
        this.initializeEnemy(this.swordSpriteKey, new Vec2(900, 1408), 10);
        this.initializeEnemy(this.swordSpriteKey, new Vec2(1000, 1408), 10);
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
        this.viewport.setBounds(32, 16, 2368, 1600);
    }

}