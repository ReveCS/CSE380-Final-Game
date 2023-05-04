import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import HW3Level from "./HW3Level";

import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";
import Viewport from "../../Wolfie2D/SceneGraph/Viewport";

import HW3AnimatedSprite from "../Nodes/HW3AnimatedSprite";
import Hub from "./Hub";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Level1 from "./HW3Level1";
import Level2 from "./HW3Level2";
import Level3 from "./Level3";
import Level4 from "./Level4";
import { LaserAnimation } from "../Laser/Laser";
import BossController from "../Boss/BossController";
import { HW3PhysicsGroups } from "../HW3PhysicsGroups";

/**
 * The first level for HW4 - should be the one with the grass and the clouds.
 */
export default class Level5 extends HW3Level {

    public static readonly PLAYER_SPAWN = new Vec2(64, 1330);;
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

    public static readonly SPAWN_AUDIO_KEY = "SPAWN";
    public static readonly SPAWN_AUDIO_PATH = "game_assets/sounds/spawn.wav";

    public static readonly TILE_DESTROYED_KEY = "TILE_DESTROYED";
    public static readonly TILE_DESTROYED_PATH = "hw4_assets/sounds/switch.wav";

    public static readonly DEATH_KEY = "DEATH";
    public static readonly DEATH_PATH = "game_assets/sounds/deathsound.mp3";

    public static readonly HIT_KEY = "HIT";
    public static readonly HIT_PATH = "game_assets/sounds/gettinghit.wav";

    public static readonly LASER_SPRITE_KEY = "LASER_SPRITE_KEY";
    public static readonly LASER_SPRITE_PATH = "game_assets/spritesheets/Attack2.json";

    public static readonly SWING_KEY = "SWING";
    public static readonly SWING_PATH = "game_assets/sounds/swing.wav";


    // Game UI Sprites
    public static readonly HP_KEY = "HEALTH";
    public static readonly HP_PATH = "game_assets/sprites/HP_Bar.png";
    public static readonly BOSS_HP_KEY = "BOSS_HEALTH";
    public static readonly BOSS_HP_PATH = "game_assets/sprites/Boss_HP_Bar.png";
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
    public static readonly BOSS_ATTACK1_KEY = "BOSS_ATTACK1";
    public static readonly BOSS_ATTACK1_PATH = "game_assets/sprites/attack_indicator.png";

    // Enemy Sprites

    public static readonly BOSS_SPAWN = new Vec2(1200,1275)
    public static readonly BOSS_SPRITE_KEY = "BOSS_SPRITE_KEY";
    public static readonly BOSS_SPRITE_PATH = "game_assets/spritesheets/boss.json";
    protected bossSpawn: Vec2;
    protected boss:HW3AnimatedSprite;
    protected bossSpriteKey: string;

    protected laser: HW3AnimatedSprite;
    protected laserSpriteKey:string;
    protected laserSpawn: Vec2;
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
        this.spawnAudioKey = Level5.SPAWN_AUDIO_KEY;
        this.tileDestroyedAudioKey = Level5.TILE_DESTROYED_KEY;
        this.deathSoundKey = Level5.DEATH_KEY;
        this.hitKey = Level5.HIT_KEY;
        this.swingKey = Level5.SWING_KEY;

        // Sprites
        this.HP_KEY = Level5.HP_KEY;
        this.BOSS_HP_KEY = Level5.BOSS_HP_KEY;

        //Inventory
        this.INV_KEY = Level5.INV_KEY;
        this.GOBLINSKULL_KEY = Level5.GOBLINSKULL_KEY;
        this.JELLYHEART_KEY = Level5.JELLYHEART_KEY;
        this.SWORDRUBY_KEY = Level5.SWORDRUBY_KEY;

        // Quest
        this.QUEST_KEY = Level5.QUEST_KEY;

        // Level end size and position
        this.levelEndPosition = new Vec2(128, 232).mult(this.tilemapScale);
        this.levelEndHalfSize = new Vec2(32, 32).mult(this.tilemapScale);

        this.laserSpriteKey = Level5.LASER_SPRITE_KEY
        
        this.BOSS_ATTACK_KEY = Level5.BOSS_ATTACK1_KEY;
  
    }

    /**
     * Load in our resources for level 1
     */
    public loadScene(): void {
        super.loadScene();
        // Load in the tilemap
        this.load.tilemap(this.tilemapKey, Level5.TILEMAP_PATH);
        // Load in the player's sprite
        this.load.spritesheet(this.playerSpriteKey, Level5.PLAYER_SPRITE_PATH);

        this.load.spritesheet(this.bossSpriteKey,Level5.BOSS_SPRITE_PATH)
        // Audio and music
        this.load.audio(this.levelMusicKey, Level5.LEVEL_MUSIC_PATH);
        this.load.audio(this.jumpAudioKey, Level5.JUMP_AUDIO_PATH);
        this.load.audio(this.spawnAudioKey,Level5.SPAWN_AUDIO_PATH);
        this.load.audio(this.tileDestroyedAudioKey, Level5.TILE_DESTROYED_PATH);
        this.load.audio(this.deathSoundKey,Level5.DEATH_PATH);
        this.load.audio(this.hitKey,Level5.HIT_PATH);
        this.load.audio(this.swingKey,Level5.SWING_PATH);
        // Game UI sprites
        this.load.image(this.HP_KEY, Level5.HP_PATH);
        this.load.image(this.INV_KEY, Level5.INV_PATH);
        this.load.image(this.GOBLINSKULL_KEY, Level5.GOBLINSKULL_PATH);
        this.load.image(this.JELLYHEART_KEY, Level5.JELLYHEART_PATH);
        this.load.image(this.SWORDRUBY_KEY, Level5.SWORDRUBY_PATH);
        this.load.image(this.QUEST_KEY, Level5.QUEST_PATH);
        this.load.image(this.BOSS_ATTACK_KEY,Level5.BOSS_ATTACK1_PATH);
        this.load.spritesheet(this.laserSpriteKey,Level5.LASER_SPRITE_PATH);
        this.load.image(this.BOSS_HP_KEY, Level5.BOSS_HP_PATH);

        // Load in Enemy sprites
    }

    /**
     * Unload resources for level 1
     */
    public unloadScene(): void {
        super.unloadScene();
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
        this.laserInitialize();
        this.nextLevel = Hub;

    }
    protected initializeFinalBoss(){
        this.boss = this.initializeBoss(this.bossSpriteKey,this.bossSpawn,5);
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
    protected laserInitialize(){
        this.laser = this.initializeLaser(this.laserSpriteKey,new Vec2(this.bossSpawn.x,this.bossSpawn.y+125))
        this.laser.boundary.setHalfSize(new Vec2(20,120));
        this.laser.addPhysics(new AABB(new Vec2(this.bossSpawn.x,this.bossSpawn.y+125),this.laser.boundary.getHalfSize().clone()));
        this.laser.setGroup(HW3PhysicsGroups.BOSS);
        this.laser.visible = false;
        this.boss.addAI(BossController, { player: this.player, radius: 5,spawn:this.bossSpawn, laser:this.laser, attack1:this.attack1});

    }

    /**
     * I had to override this method to adjust the viewport for the first level. I screwed up 
     * when I was making the tilemap for the first level is what it boils down to.
     * 
     * - Peter
     */
    protected initializeViewport(): void {
        super.initializeViewport();
        this.viewport.setBounds(32, 16, 2368, 1480);
    }

}