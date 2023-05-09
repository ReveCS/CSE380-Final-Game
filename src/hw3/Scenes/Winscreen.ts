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
export const WinLayers = {
    WIN:"WIN"
} as const;

// Events triggered in the splash screen
const WinScreenEvent = {
    CLICK: "CLICK"
} as const;

export default class Winscreen extends Scene {
    // Layers, for multiple main menu screens
    private win: Layer;
    
    private winScreen: Sprite;
    // Music
    public static readonly MUSIC_KEY = "WINSCREEN_MUSIC";
    public static readonly MUSIC_PATH = "game_assets/music/Victory.wav";

    // Background
    public static WIN_KEY = "WIN";
    public static WIN_PATH = "game_assets/backgrounds/winscreen.png";
	
    public loadScene(): void {
        super.loadScene();
        // Load the menu song
        this.load.audio(Winscreen.MUSIC_KEY, Winscreen.MUSIC_PATH);

        // Load sprites
		this.load.image(Winscreen.WIN_KEY, Winscreen.WIN_PATH);

        // clear the session after every refresh
        sessionStorage.clear();
    }

    public startScene(): void {
        const center = this.viewport.getCenter();

        // Splash screen
        this.win = this.addUILayer(WinLayers.WIN);
        this.winScreen = this.add.sprite(Winscreen.WIN_KEY,WinLayers.WIN);
        this.winScreen.position.copy(center);
        this.winScreen.scale.scale(1,1);

        // Add levels button, and give it an event to emit on press
        const win = <Button> this.add.uiElement(UIElementType.BUTTON, WinLayers.WIN, {position: new Vec2(center.x, center.y + 100), text: "Click to continue"});
        win.size.set(1000, 1000);
        //levels.borderColor = Color.WHITE;
        win.borderColor = Color.TRANSPARENT;
        win.backgroundColor = Color.TRANSPARENT;
        win.font = "Hjet-Regular";
        win.onClick = () => {
            this.sceneManager.changeToScene(MainMenu);
        }

        // Subscribe to the button events
        this.receiver.subscribe(WinScreenEvent.CLICK);

        // Scene has started, so start playing music
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: Winscreen.MUSIC_KEY, loop: true, holdReference: true});
    }

    public unloadScene(): void {
        super.unloadScene();
        // The scene is being destroyed, so we can stop playing the song
        this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: Winscreen.MUSIC_KEY});
    }

    public updateScene(): void {
        while(this.receiver.hasNextEvent()) {
            this.handleEvent(this.receiver.getNextEvent());
        }
    }

    protected handleEvent(event: GameEvent): void {
        switch(event.type) {
            case WinScreenEvent.CLICK: {
                break;
            }
            default: {
                throw new Error(`Unhandled event caught in SplashScreen: "${event.type}"`);
            }
        }
    }
}

