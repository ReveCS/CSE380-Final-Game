import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Layer from "../../Wolfie2D/Scene/Layer";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import MainMenu from "./MainMenu";


// Layers for the slpash screen
export const SplashLayers = {
    SPLASH: "SPLASH"
} as const;

// Events triggered in the splash screen
const SplashScreenEvent = {
    CLICK: "CLICK"
} as const;

export default class SplashScreen extends Scene {
    // Layers, for multiple main menu screens
    private splash: Layer;

    // Sprites for background and buttons
    // Sprites for the background images
	private bg: AnimatedSprite;
    private logoSprite: Sprite;


    
    // Music
    public static readonly MUSIC_KEY = "MAIN_MENU_MUSIC";
    public static readonly MUSIC_PATH = "game_assets/music/menu.mp3";

    // Background
    public static BACKGROUND_KEY = "BACKGROUND";
    public static BACKGROUND_PATH = "game_assets/backgrounds/WavyBlueLines.png";

    // The key and path to the sprites
    public static LOGO_KEY = "LOGO";
    public static LOGO_PATH = "game_assets/sprites/Logo.png";
	
    public loadScene(): void {
        super.loadScene();
        // Load the menu song
        //this.load.audio(SplashScreen.MUSIC_KEY, SplashScreen.MUSIC_PATH);

        // Load sprites
		this.load.image(SplashScreen.BACKGROUND_KEY, SplashScreen.BACKGROUND_PATH);
        this.load.image(SplashScreen.LOGO_KEY, SplashScreen.LOGO_PATH);

        // clear the session after every refresh
        sessionStorage.clear();
    }

    public startScene(): void {
        const center = this.viewport.getCenter();

        // Splash screen
        this.splash = this.addUILayer(SplashLayers.SPLASH);

        // Add logo sprite
        this.logoSprite = this.add.sprite(SplashScreen.LOGO_KEY, SplashLayers.SPLASH);
        this.logoSprite.position.copy(new Vec2(center.x, center.y - 100));
        this.logoSprite.scale.scale(3, 3);

        // Add levels button, and give it an event to emit on press
        const splash = <Button> this.add.uiElement(UIElementType.BUTTON, SplashLayers.SPLASH, {position: new Vec2(center.x, center.y + 200), text: "Click to continue"});
        splash.size.set(1000, 1000);
        //levels.borderColor = Color.WHITE;
        splash.borderColor = Color.TRANSPARENT;
        splash.backgroundColor = Color.TRANSPARENT;
        splash.font = "Hjet-Regular";
        splash.onClick = () => {
            this.sceneManager.changeToScene(MainMenu);
        }

        // Subscribe to the button events
        this.receiver.subscribe(SplashScreenEvent.CLICK);

        // Scene has started, so start playing music
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: SplashScreen.MUSIC_KEY, loop: true, holdReference: true});
    }

    public unloadScene(): void {
        super.unloadScene();
        // The scene is being destroyed, so we can stop playing the song
        this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: SplashScreen.MUSIC_KEY});
    }

    public updateScene(): void {
        while(this.receiver.hasNextEvent()) {
            this.handleEvent(this.receiver.getNextEvent());
        }
    }

    protected handleEvent(event: GameEvent): void {
        switch(event.type) {
            case SplashScreenEvent.CLICK: {
                break;
            }
            default: {
                throw new Error(`Unhandled event caught in SplashScreen: "${event.type}"`);
            }
        }
    }
}

