import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Layer from "../../Wolfie2D/Scene/Layer";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import Level1 from "./HW3Level1";
import GameEvent from "../../Wolfie2D/Events/GameEvent";

// Layers for the main menu scene
export const MenuLayers = {
    MAIN: "MAIN", 
    CONTROLS: "CONTROLS",
    ABOUT: "ABOUT",
    CREDIT: "CREDIT"
} as const;

// Events triggered in the main menu
const MainMenuEvent = {
	CONTROLS: "CONTROLS",
	ABOUT: "ABOUT",
    CREDIT: "CREDIT",
	MENU: "MENU",
} as const;

export default class MainMenu extends Scene {
    // Layers, for multiple main menu screens
    private mainMenu: Layer;
    private controls: Layer;
    private about: Layer;
    private credit: Layer;

    // Music
    public static readonly MUSIC_KEY = "MAIN_MENU_MUSIC";
    public static readonly MUSIC_PATH = "hw4_assets/music/menu.mp3";

    public loadScene(): void {
        // Load the menu song
        this.load.audio(MainMenu.MUSIC_KEY, MainMenu.MUSIC_PATH);

        //Load background
        //this.load.image("background", "demo_assets/images/platformer_background.png");

    }

    public startScene(): void {
        const center = this.viewport.getCenter();

        // Main menu screen
        this.mainMenu = this.addUILayer(MenuLayers.MAIN);
        this.mainMenu.setDepth

        // Controls screen
        this.controls = this.addUILayer(MenuLayers.CONTROLS);
        this.controls.setHidden(true);
        
        // About screen
        this.about = this.addUILayer(MenuLayers.ABOUT);
        this.about.setHidden(true);

        // Credit screen
        this.credit = this.addUILayer(MenuLayers.CREDIT);
        this.credit.setHidden(true);

        // Add play button, and give it an event to emit on press
        const play = <Button> this.add.uiElement(UIElementType.BUTTON, MenuLayers.MAIN, {position: new Vec2(center.x, center.y - 100), text: "Play"});
        play.size.set(200, 50);
        play.borderWidth = 2;
        play.borderColor = Color.WHITE;
        play.backgroundColor = Color.TRANSPARENT;
        play.font = "Lucida Console";
        play.onClick = () => {
            this.sceneManager.changeToScene(Level1);
        }

        // Add controls button
        const controls = <Button> this.add.uiElement(UIElementType.BUTTON, MenuLayers.MAIN, {position: new Vec2(center.x, center.y), text: "Controls"});
        controls.size.set(200, 50);
        controls.borderWidth = 2;
        controls.borderColor = Color.WHITE;
        controls.backgroundColor = Color.TRANSPARENT;
        controls.onClickEventId = MainMenuEvent.CONTROLS;
        controls.font = "Lucida Console"

        // Add about button
        const about = <Button> this.add.uiElement(UIElementType.BUTTON, MenuLayers.MAIN, {position: new Vec2(center.x, center.y + 100), text: "About"});
        about.size.set(200, 50);
        about.borderWidth = 2;
        about.borderColor = Color.WHITE;
        about.backgroundColor = Color.TRANSPARENT;
        about.onClickEventId = MainMenuEvent.ABOUT;
        about.font = "Lucida Console";

        // Add credit button
        const credit = <Button> this.add.uiElement(UIElementType.BUTTON, MenuLayers.MAIN, {position: new Vec2(center.x, center.y + 200), text: "Credit"});
        credit.size.set(200, 50);
        credit.borderWidth = 2;
        credit.borderColor = Color.WHITE;
        credit.backgroundColor = Color.TRANSPARENT;
        credit.onClickEventId = MainMenuEvent.CREDIT;
        credit.font = "Lucida Console";

        const header = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.CONTROLS, {position: new Vec2(center.x, center.y - 250), text: "Controls"});
        header.textColor = Color.WHITE;
        header.font = "Lucida Console";

        const ws = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.CONTROLS, {position: new Vec2(center.x, center.y - 50), text: "Press W to speed up and S to slow down"});
        ws.textColor = Color.WHITE;
        ws.font = "Lucida Console"
        const ad = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.CONTROLS, {position: new Vec2(center.x, center.y), text: "Press A and D to to move left and right respectively"});
        ad.textColor = Color.WHITE;
        ad.font = "Lucida Console"
        const click = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.CONTROLS, {position: new Vec2(center.x, center.y + 50), text: "-Click to shoot bullets"});
        click.textColor = Color.WHITE;
        click.font = "Lucida Console"
        const shift = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.CONTROLS, {position: new Vec2(center.x, center.y + 100), text: "-Press shift to speed up, however you cannot shoot bullets"});
        shift.textColor = Color.WHITE
        shift.font = "Lucida Console"
        const shift2 = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.CONTROLS, {position: new Vec2(center.x, center.y + 150), text: "while moving faster"});
        shift2.textColor = Color.WHITE;
        shift2.font = "Lucida Console"  

        const back = this.add.uiElement(UIElementType.BUTTON, MenuLayers.CONTROLS, {position: new Vec2(center.x, center.y + 250), text: "Back"});
        back.size.set(200, 50);
        back.borderWidth = 2;
        back.borderColor = Color.WHITE;
        back.backgroundColor = Color.TRANSPARENT;
        back.onClickEventId = MainMenuEvent.MENU;

        const aboutHeader = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.ABOUT, {position: new Vec2(center.x, center.y - 250), text: "About"});
        aboutHeader.textColor = Color.WHITE;

        const text1 = "This game was made by Avery Chan, Peter Walsh and Richard McKenna";
        const text2 = "using the Wolfie2D game engine, a TypeScript game engine created by";
        const text3 = "Joe Weaver and Richard McKenna.";

        const line1 = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.ABOUT, {position: new Vec2(center.x, center.y - 50), text: text1});
        const line2 = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.ABOUT, {position: new Vec2(center.x, center.y), text: text2});
        const line3 = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.ABOUT, {position: new Vec2(center.x, center.y + 50), text: text3});

        line1.textColor = Color.WHITE;
        line2.textColor = Color.WHITE;
        line3.textColor = Color.WHITE;

        const aboutBack = this.add.uiElement(UIElementType.BUTTON, MenuLayers.ABOUT, {position: new Vec2(center.x, center.y + 250), text: "Back"});
        aboutBack.size.set(200, 50);
        aboutBack.borderWidth = 2;
        aboutBack.borderColor = Color.WHITE;
        aboutBack.backgroundColor = Color.TRANSPARENT;
        aboutBack.onClickEventId = MainMenuEvent.MENU;

        // Subscribe to the button events
        this.receiver.subscribe(MainMenuEvent.CONTROLS);
        this.receiver.subscribe(MainMenuEvent.ABOUT);
        this.receiver.subscribe(MainMenuEvent.CREDIT);
        this.receiver.subscribe(MainMenuEvent.MENU);

        // Scene has started, so start playing music
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.MUSIC_KEY, loop: true, holdReference: true});
    }

    public unloadScene(): void {
        // The scene is being destroyed, so we can stop playing the song
        this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: MainMenu.MUSIC_KEY});
    }

    public updateScene(): void {
        while(this.receiver.hasNextEvent()) {
            this.handleEvent(this.receiver.getNextEvent());
        }
    }

    protected handleEvent(event: GameEvent): void {
        switch(event.type) {
            case MainMenuEvent.CONTROLS: {
                this.controls.setHidden(false);
                this.mainMenu.setHidden(true);
                break;
            }
            case MainMenuEvent.ABOUT: {
                this.about.setHidden(false);
                this.mainMenu.setHidden(true);
                break;
            }
            case MainMenuEvent.CREDIT: {
                this.credit.setHidden(false);
                this.mainMenu.setHidden(true);
                break;
            }
            case MainMenuEvent.MENU: {
                this.mainMenu.setHidden(false);
                this.controls.setHidden(true);
                this.about.setHidden(true);
                break;
            }
            default: {
                throw new Error(`Unhandled event caught in MainMenu: "${event.type}"`);
            }
        }
    }
}

