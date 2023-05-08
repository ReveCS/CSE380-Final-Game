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
import Tutorial from "./Tutorial";


// Layers for the slpash screen
export const BackstoryLayers = {
    PAGE1: "PAGE1",
    PAGE2: "PAGE2",
    PAGE3: "PAGE3",
    PAGE4: "PAGE4",
    PAGE5: "PAGE5"
} as const;

// Events triggered in the splash screen
const BackstoryScreenEvent = {
    PAGE1: "PAGE1",
    PAGE2: "PAGE2",
    PAGE3: "PAGE3",
    PAGE4: "PAGE4",
    PAGE5: "PAGE5"
} as const;

export default class Backstory extends Scene {
    // Layers, for multiple main menu screens
    private page1: Layer;
    private page2: Layer;
    private page3: Layer;
    private page4: Layer;
    private page5: Layer;
    // Sprites for background and buttons
    // Sprites for the background images
	private bg: AnimatedSprite;
    private backstory1: Sprite;
    private backstory2: Sprite;
    private backstory3: Sprite;
    private backstory4: Sprite;
    private backstory5: Sprite;


    
    // Background
    public static BACKSTORY1_KEY = "BACKSTORY1";
    public static BACKSTORY1_PATH = "game_assets/backgrounds/backstory1.png";
    public static BACKSTORY2_KEY = "BACKSTORY2";
    public static BACKSTORY2_PATH = "game_assets/backgrounds/backstory2.png";
    public static BACKSTORY3_KEY = "BACKSTORY3";
    public static BACKSTORY3_PATH = "game_assets/backgrounds/backstory3.png";
    public static BACKSTORY4_KEY = "BACKSTORY4";
    public static BACKSTORY4_PATH = "game_assets/backgrounds/backstory4.png";
    public static BACKSTORY5_KEY = "BACKSTORY5";
    public static BACKSTORY5_PATH = "game_assets/backgrounds/backstory5.png";


    // The key and path to the sprites
    public static LOGO_KEY = "LOGO";
    public static LOGO_PATH = "game_assets/sprites/Logo.png";
	
    public loadScene(): void {
        super.loadScene();
        // Load the menu song
        //this.load.audio(SplashScreen.MUSIC_KEY, SplashScreen.MUSIC_PATH);

        // Load sprites
		this.load.image(Backstory.BACKSTORY1_KEY, Backstory.BACKSTORY1_PATH);
        this.load.image(Backstory.BACKSTORY2_KEY, Backstory.BACKSTORY2_PATH);
        this.load.image(Backstory.BACKSTORY3_KEY, Backstory.BACKSTORY3_PATH);
        this.load.image(Backstory.BACKSTORY4_KEY, Backstory.BACKSTORY4_PATH);
        this.load.image(Backstory.BACKSTORY5_KEY, Backstory.BACKSTORY5_PATH);
        this.load.image(Backstory.LOGO_KEY, Backstory.LOGO_PATH);

        // clear the session after every refresh
        sessionStorage.clear();
    }

    public startScene(): void {

        const center = this.viewport.getCenter();

        // Splash screen
        this.page1 = this.addUILayer(BackstoryLayers.PAGE1);
        this.page2 = this.addUILayer(BackstoryLayers.PAGE2);
        this.page2.setHidden(true);
        this.page3 = this.addUILayer(BackstoryLayers.PAGE3);
        this.page3.setHidden(true);
        this.page4 = this.addUILayer(BackstoryLayers.PAGE4);
        this.page4.setHidden(true);
        this.page5 = this.addUILayer(BackstoryLayers.PAGE5);
        this.page5.setHidden(true);
        // Add logo sprite
        this.backstory1 = this.add.sprite(Backstory.BACKSTORY1_KEY, BackstoryLayers.PAGE1);
        this.backstory1.position.copy(center);
        this.backstory1.scale.scale(1, 1);

        this.backstory2 = this.add.sprite(Backstory.BACKSTORY2_KEY, BackstoryLayers.PAGE2);
        this.backstory2.position.copy(center);
        this.backstory2.scale.scale(1, 1);

        this.backstory3 = this.add.sprite(Backstory.BACKSTORY3_KEY, BackstoryLayers.PAGE3);
        this.backstory3.position.copy(center);
        this.backstory3.scale.scale(1, 1);

        this.backstory4 = this.add.sprite(Backstory.BACKSTORY4_KEY, BackstoryLayers.PAGE4);
        this.backstory4.position.copy(center);
        this.backstory4.scale.scale(1, 1);

        this.backstory5 = this.add.sprite(Backstory.BACKSTORY5_KEY, BackstoryLayers.PAGE5);
        this.backstory5.position.copy(center);
        this.backstory5.scale.scale(1, 1);

        // Add levels button, and give it an event to emit on press
        const page1Button = <Button> this.add.uiElement(UIElementType.BUTTON, BackstoryLayers.PAGE1, {position: new Vec2(center.x+400, center.y + 300), text: "Next"});
        page1Button.size.set(300, 100);
        //levels.borderColor = Color.WHITE;
        page1Button.borderColor = Color.TRANSPARENT;
        page1Button.backgroundColor = Color.TRANSPARENT;
        page1Button.font = "Hjet-Regular";
        page1Button.onClickEventId = BackstoryScreenEvent.PAGE2;
        
        const page2Button = <Button> this.add.uiElement(UIElementType.BUTTON, BackstoryLayers.PAGE2, {position: new Vec2(center.x+400, center.y + 300), text: "Next"});
        page2Button.size.set(300, 100);
        //levels.borderColor = Color.WHITE;
        page2Button.borderColor = Color.TRANSPARENT;
        page2Button.backgroundColor = Color.TRANSPARENT;
        page2Button.font = "Hjet-Regular";
        page2Button.onClickEventId = BackstoryScreenEvent.PAGE3;

        const page3Button = <Button> this.add.uiElement(UIElementType.BUTTON, BackstoryLayers.PAGE3, {position: new Vec2(center.x+400, center.y + 300), text: "Next"});
        page3Button.size.set(300, 100);
        //levels.borderColor = Color.WHITE;
        page3Button.borderColor = Color.TRANSPARENT;
        page3Button.backgroundColor = Color.TRANSPARENT;
        page3Button.font = "Hjet-Regular";
        page3Button.onClickEventId = BackstoryScreenEvent.PAGE4;
        

        const page4Button = <Button> this.add.uiElement(UIElementType.BUTTON, BackstoryLayers.PAGE4, {position: new Vec2(center.x+400, center.y + 300), text: "Next"});
        page4Button.size.set(300, 100);
        //levels.borderColor = Color.WHITE;
        page4Button.borderColor = Color.TRANSPARENT;
        page4Button.backgroundColor = Color.TRANSPARENT;
        page4Button.font = "Hjet-Regular";
        page4Button.onClickEventId = BackstoryScreenEvent.PAGE5;
        

        const page5Button = <Button> this.add.uiElement(UIElementType.BUTTON, BackstoryLayers.PAGE5, {position: new Vec2(center.x+400, center.y + 300), text: "Next"});
        page5Button.size.set(300, 100);
        //levels.borderColor = Color.WHITE;
        page5Button.borderColor = Color.TRANSPARENT;
        page5Button.backgroundColor = Color.TRANSPARENT;
        page5Button.font = "Hjet-Regular";
        page5Button.onClick = () => {

            this.sceneManager.changeToScene(MainMenu);
        }

        // const aboutText1 = "Pyke Kallus used to be an ordinary mailman, delivering letters and";
        // const aboutText2 = "packages across the country. But when delivering his 1000th package,";
        // const aboutText3 = "he accidentally opens it, and is suddenly transported into the fantasy";
        // const aboutText4 = "world of Atnis. And now, in order to make a living, he works for UBS";
        // const aboutText5 = "(United Bounty Service) and delivers heads instead of mail every day."; 
        // const aboutText6 = "As the top Bounty Hunter, Pyke, with his trusty Mailhammer, travels";
        // const aboutText7 = "around the plagued lands of Atnis to rid them of invading monsters";
        // const aboutText8 = "that threaten the common people.";

        // const aboutLine1 = <Label>this.add.uiElement(UIElementType.LABEL, BackstoryLayers.PAGE1, {position: new Vec2(center.x, center.y - 150), text: aboutText1});
        // aboutLine1.font = "Hjet-Regular"
        // const aboutLine2 = <Label>this.add.uiElement(UIElementType.LABEL, BackstoryLayers.ABOUT, {position: new Vec2(center.x, center.y - 100), text: aboutText2});
        // aboutLine2.font = "Hjet-Regular"
        // const aboutLine3 = <Label>this.add.uiElement(UIElementType.LABEL, BackstoryLayers.ABOUT, {position: new Vec2(center.x, center.y - 50), text: aboutText3});
        // aboutLine3.font = "Hjet-Regular"
        // const aboutLine4 = <Label>this.add.uiElement(UIElementType.LABEL, BackstoryLayers.ABOUT, {position: new Vec2(center.x, center.y), text: aboutText4});
        // aboutLine4.font = "Hjet-Regular"
        // const aboutLine5 = <Label>this.add.uiElement(UIElementType.LABEL, BackstoryLayers.ABOUT, {position: new Vec2(center.x, center.y + 50), text: aboutText5});
        // aboutLine5.font = "Hjet-Regular"
        // const aboutLine6 = <Label>this.add.uiElement(UIElementType.LABEL, BackstoryLayers.ABOUT, {position: new Vec2(center.x, center.y + 100), text: aboutText6});
        // aboutLine6.font = "Hjet-Regular"
        // const aboutLine7 = <Label>this.add.uiElement(UIElementType.LABEL, BackstoryLayers.ABOUT, {position: new Vec2(center.x, center.y + 150), text: aboutText7});
        // aboutLine7.font = "Hjet-Regular"
        // const aboutLine8 = <Label>this.add.uiElement(UIElementType.LABEL, BackstoryLayers.ABOUT, {position: new Vec2(center.x, center.y + 200), text: aboutText8});
        // aboutLine8.font = "Hjet-Regular"

        // aboutLine1.textColor = Color.WHITE;
        // aboutLine2.textColor = Color.WHITE;
        // aboutLine3.textColor = Color.WHITE;
        // aboutLine4.textColor = Color.WHITE;
        // aboutLine5.textColor = Color.WHITE;
        // aboutLine6.textColor = Color.WHITE;
        // aboutLine7.textColor = Color.WHITE;
        // aboutLine8.textColor = Color.WHITE;

        // Subscribe to the button events
        this.receiver.subscribe(BackstoryScreenEvent.PAGE1);
        this.receiver.subscribe(BackstoryScreenEvent.PAGE2);
        this.receiver.subscribe(BackstoryScreenEvent.PAGE3);
        this.receiver.subscribe(BackstoryScreenEvent.PAGE4);
        this.receiver.subscribe(BackstoryScreenEvent.PAGE5);

        // Scene has started, so start playing music
    }

    public unloadScene(): void {
        super.unloadScene();
        // The scene is being destroyed, so we can stop playing the song
       
    }

    public updateScene(): void {
        while(this.receiver.hasNextEvent()) {
            this.handleEvent(this.receiver.getNextEvent());
        }
    }

    protected handleEvent(event: GameEvent): void {
        switch(event.type) {
            case BackstoryScreenEvent.PAGE1: {
                this.page1.setHidden(false);
                this.page2.setHidden(true);
                this.page3.setHidden(true);
                this.page4.setHidden(true);
                this.page5.setHidden(true);

                break;
            }
            case BackstoryScreenEvent.PAGE2: {
                this.page1.setHidden(true);
                this.page2.setHidden(false);
                this.page3.setHidden(true);
                this.page4.setHidden(true);
                this.page5.setHidden(true);

                break;
            }
            case BackstoryScreenEvent.PAGE3: {
                this.page1.setHidden(true);
                this.page2.setHidden(true);
                this.page3.setHidden(false);
                this.page4.setHidden(true);
                this.page5.setHidden(true);

                break;
            }
            case BackstoryScreenEvent.PAGE4: {
                this.page1.setHidden(true);
                this.page2.setHidden(true);
                this.page3.setHidden(true);
                this.page4.setHidden(false);
                this.page5.setHidden(true);

                break;
            }
            case BackstoryScreenEvent.PAGE5: {
                this.page1.setHidden(true);
                this.page2.setHidden(true);
                this.page3.setHidden(true);
                this.page4.setHidden(true);
                this.page5.setHidden(false);

                break;
            }
            default: {
                throw new Error(`Unhandled event caught in SplashScreen: "${event.type}"`);
            }
        }
    }
}

