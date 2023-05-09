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
    PAGE5: "PAGE5",
    PAGE6: "PAGE6",
    PAGE7: "PAGE7",
    PAGE8: "PAGE8",
    PAGE9: "PAGE9",
    PAGE10: "PAGE10"
} as const;

// Events triggered in the splash screen
const BackstoryScreenEvent = {
    PAGE1: "PAGE1",
    PAGE2: "PAGE2",
    PAGE3: "PAGE3",
    PAGE4: "PAGE4",
    PAGE5: "PAGE5",
    PAGE6: "PAGE6",
    PAGE7: "PAGE7",
    PAGE8: "PAGE8",
    PAGE9: "PAGE9",
    PAGE10: "PAGE10"
} as const;

export default class Backstory extends Scene {
    // Layers, for multiple main menu screens
    private page1: Layer;
    private page2: Layer;
    private page3: Layer;
    private page4: Layer;
    private page5: Layer;
    private page6: Layer;
    private page7: Layer;
    private page8: Layer;
    private page9: Layer;
    private page10: Layer;
    // Sprites for background and buttons
    // Sprites for the background images
	private bg: AnimatedSprite;
    private backstory1: Sprite;
    private backstory2: Sprite;
    private backstory3: Sprite;
    private backstory4: Sprite;
    private backstory5: Sprite;
    private backstory6: Sprite;
    private backstory7: Sprite;
    private backstory8: Sprite;
    private backstory9: Sprite;
    private backstory10: Sprite;


    
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
    public static BACKSTORY6_KEY = "BACKSTORY6";
    public static BACKSTORY6_PATH = "game_assets/backgrounds/backstory6.png";
    public static BACKSTORY7_KEY = "BACKSTORY7";
    public static BACKSTORY7_PATH = "game_assets/backgrounds/backstory7.png";
    public static BACKSTORY8_KEY = "BACKSTORY8";
    public static BACKSTORY8_PATH = "game_assets/backgrounds/backstory8.png";
    public static BACKSTORY9_KEY = "BACKSTORY9";
    public static BACKSTORY9_PATH = "game_assets/backgrounds/backstory9.png";
    public static BACKSTORY10_KEY = "BACKSTORY10";
    public static BACKSTORY10_PATH = "game_assets/backgrounds/backstory10.png";



    // The key and path to the sprites

	
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
        this.load.image(Backstory.BACKSTORY6_KEY, Backstory.BACKSTORY6_PATH);
        this.load.image(Backstory.BACKSTORY7_KEY, Backstory.BACKSTORY7_PATH);
        this.load.image(Backstory.BACKSTORY8_KEY, Backstory.BACKSTORY8_PATH);
        this.load.image(Backstory.BACKSTORY9_KEY, Backstory.BACKSTORY9_PATH);
        this.load.image(Backstory.BACKSTORY10_KEY, Backstory.BACKSTORY10_PATH);
    

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
        this.page6 = this.addUILayer(BackstoryLayers.PAGE6);
        this.page6.setHidden(true);
        this.page7 = this.addUILayer(BackstoryLayers.PAGE7);
        this.page7.setHidden(true);
        this.page8 = this.addUILayer(BackstoryLayers.PAGE8);
        this.page8.setHidden(true);
        this.page9 = this.addUILayer(BackstoryLayers.PAGE9);
        this.page9.setHidden(true);
        this.page10 = this.addUILayer(BackstoryLayers.PAGE10);
        this.page10.setHidden(true);
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

        this.backstory6 = this.add.sprite(Backstory.BACKSTORY6_KEY, BackstoryLayers.PAGE6);
        this.backstory6.position.copy(center);
        this.backstory6.scale.scale(1, 1);

        this.backstory7 = this.add.sprite(Backstory.BACKSTORY7_KEY, BackstoryLayers.PAGE7);
        this.backstory7.position.copy(center);
        this.backstory7.scale.scale(1, 1);

        this.backstory8 = this.add.sprite(Backstory.BACKSTORY8_KEY, BackstoryLayers.PAGE8);
        this.backstory8.position.copy(center);
        this.backstory8.scale.scale(1, 1);

        this.backstory9 = this.add.sprite(Backstory.BACKSTORY9_KEY, BackstoryLayers.PAGE9);
        this.backstory9.position.copy(center);
        this.backstory9.scale.scale(1, 1);

        this.backstory10 = this.add.sprite(Backstory.BACKSTORY10_KEY, BackstoryLayers.PAGE10);
        this.backstory10.position.copy(center);
        this.backstory10.scale.scale(1, 1);

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
        page5Button.onClickEventId = BackstoryScreenEvent.PAGE6;

        const page6Button = <Button> this.add.uiElement(UIElementType.BUTTON, BackstoryLayers.PAGE6, {position: new Vec2(center.x+400, center.y + 300), text: "Next"});
        page6Button.size.set(300, 100);
        //levels.borderColor = Color.WHITE;
        page6Button.borderColor = Color.TRANSPARENT;
        page6Button.backgroundColor = Color.TRANSPARENT;
        page6Button.font = "Hjet-Regular";
        page6Button.onClickEventId = BackstoryScreenEvent.PAGE7;

        const page7Button = <Button> this.add.uiElement(UIElementType.BUTTON, BackstoryLayers.PAGE7, {position: new Vec2(center.x+400, center.y + 300), text: "Next"});
        page7Button.size.set(300, 100);
        //levels.borderColor = Color.WHITE;
        page7Button.borderColor = Color.TRANSPARENT;
        page7Button.backgroundColor = Color.TRANSPARENT;
        page7Button.font = "Hjet-Regular";
        page7Button.onClickEventId = BackstoryScreenEvent.PAGE8;

        const page8Button = <Button> this.add.uiElement(UIElementType.BUTTON, BackstoryLayers.PAGE8, {position: new Vec2(center.x+400, center.y + 300), text: "Next"});
        page8Button.size.set(300, 100);
        //levels.borderColor = Color.WHITE;
        page8Button.borderColor = Color.TRANSPARENT;
        page8Button.backgroundColor = Color.TRANSPARENT;
        page8Button.font = "Hjet-Regular";
        page8Button.onClickEventId = BackstoryScreenEvent.PAGE9;

        const page9Button = <Button> this.add.uiElement(UIElementType.BUTTON, BackstoryLayers.PAGE9, {position: new Vec2(center.x+400, center.y + 300), text: "Next"});
        page9Button.size.set(300, 100);
        //levels.borderColor = Color.WHITE;
        page9Button.borderColor = Color.TRANSPARENT;
        page9Button.backgroundColor = Color.TRANSPARENT;
        page9Button.font = "Hjet-Regular";
        page9Button.onClickEventId = BackstoryScreenEvent.PAGE10;

        const page10Button = <Button> this.add.uiElement(UIElementType.BUTTON, BackstoryLayers.PAGE10, {position: new Vec2(center.x+400, center.y + 300), text: "Next"});
        page10Button.size.set(300, 100);
        //levels.borderColor = Color.WHITE;
        page10Button.borderColor = Color.TRANSPARENT;
        page10Button.backgroundColor = Color.TRANSPARENT;
        page10Button.font = "Hjet-Regular";
        page10Button.onClick = () => {

            this.sceneManager.changeToScene(MainMenu);
        }

        const aboutText1 = "Pyke Kallus was an ordinary mailman, delivering letters and";
        const aboutText2 = "packages across the city.";
        
        const aboutText3 = "But when on his way to deliver his 1000th package...";
        const aboutText4 = "He is magically transported into the world of Atnis.";
        const aboutText5 = "And now, in order to make a living, he works for the ";
        const aboutText6 = "UBS (United Bounty Service) and delivers bounties instead of mail."; 
        const aboutText7 = "And now as the top Bounty Hunter, Pyke, with his trusty Mailhammer,";
        const aboutText8 = "travels around the plagued lands of Atnis to rid them of"
        const aboutText9 = "the invading monsters that threaten the common people";
        const aboutText10 = " and hopefully one day find his way home in...";

        const aboutLine1 = <Label>this.add.uiElement(UIElementType.LABEL, BackstoryLayers.PAGE1, {position: new Vec2(center.x, center.y - 200), text: aboutText1});
        aboutLine1.font = "Hjet-Regular"
        const aboutLine2 = <Label>this.add.uiElement(UIElementType.LABEL, BackstoryLayers.PAGE1, {position: new Vec2(center.x, center.y - 150), text: aboutText2});
        aboutLine2.font = "Hjet-Regular"
        const aboutLine3 = <Label>this.add.uiElement(UIElementType.LABEL, BackstoryLayers.PAGE2, {position: new Vec2(center.x, center.y - 50), text: aboutText3});
        aboutLine3.font = "Hjet-Regular"
        const aboutLine4 = <Label>this.add.uiElement(UIElementType.LABEL, BackstoryLayers.PAGE7, {position: new Vec2(center.x, center.y), text: aboutText4});
        aboutLine4.font = "Hjet-Regular"
        const aboutLine5 = <Label>this.add.uiElement(UIElementType.LABEL, BackstoryLayers.PAGE8, {position: new Vec2(center.x, center.y - 250), text: aboutText5});
        aboutLine5.font = "Hjet-Regular"
        const aboutLine6 = <Label>this.add.uiElement(UIElementType.LABEL, BackstoryLayers.PAGE8, {position: new Vec2(center.x, center.y - 200), text: aboutText6});
        aboutLine6.font = "Hjet-Regular"
        const aboutLine7 = <Label>this.add.uiElement(UIElementType.LABEL, BackstoryLayers.PAGE9, {position: new Vec2(center.x, center.y + 150), text: aboutText7});
        aboutLine7.font = "Hjet-Regular"
        const aboutLine8 = <Label>this.add.uiElement(UIElementType.LABEL, BackstoryLayers.PAGE9, {position: new Vec2(center.x, center.y + 200), text: aboutText8});
        aboutLine8.font = "Hjet-Regular"
        const aboutLine9 = <Label>this.add.uiElement(UIElementType.LABEL, BackstoryLayers.PAGE9, {position: new Vec2(center.x, center.y + 250), text: aboutText9});
        aboutLine9.font = "Hjet-Regular"
        const aboutLine10 = <Label>this.add.uiElement(UIElementType.LABEL, BackstoryLayers.PAGE10, {position: new Vec2(center.x, center.y - 200), text: aboutText10});
        aboutLine10.font = "Hjet-Regular"

        aboutLine1.textColor = Color.WHITE;
        aboutLine2.textColor = Color.WHITE;
        aboutLine3.textColor = Color.WHITE;
        aboutLine4.textColor = Color.WHITE;
        aboutLine5.textColor = Color.WHITE;
        aboutLine6.textColor = Color.WHITE;
        aboutLine7.textColor = Color.WHITE;
        aboutLine8.textColor = Color.WHITE;
        aboutLine9.textColor = Color.WHITE;
        aboutLine10.textColor = Color.WHITE;

        // Subscribe to the button events
        this.receiver.subscribe(BackstoryScreenEvent.PAGE1);
        this.receiver.subscribe(BackstoryScreenEvent.PAGE2);
        this.receiver.subscribe(BackstoryScreenEvent.PAGE3);
        this.receiver.subscribe(BackstoryScreenEvent.PAGE4);
        this.receiver.subscribe(BackstoryScreenEvent.PAGE5);
        this.receiver.subscribe(BackstoryScreenEvent.PAGE6);
        this.receiver.subscribe(BackstoryScreenEvent.PAGE7);
        this.receiver.subscribe(BackstoryScreenEvent.PAGE8);
        this.receiver.subscribe(BackstoryScreenEvent.PAGE9);
        this.receiver.subscribe(BackstoryScreenEvent.PAGE10);

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
                this.page6.setHidden(true);
                this.page7.setHidden(true);
                this.page8.setHidden(true);
                this.page9.setHidden(true);
                this.page10.setHidden(true);
                break;
            }
            case BackstoryScreenEvent.PAGE2: {
                this.page1.setHidden(true);
                this.page2.setHidden(false);
                this.page3.setHidden(true);
                this.page4.setHidden(true);
                this.page5.setHidden(true);
                this.page6.setHidden(true);
                this.page7.setHidden(true);
                this.page8.setHidden(true);
                this.page9.setHidden(true);
                this.page10.setHidden(true);
                break;
            }
            case BackstoryScreenEvent.PAGE3: {
                this.page1.setHidden(true);
                this.page2.setHidden(true);
                this.page3.setHidden(false);
                this.page4.setHidden(true);
                this.page5.setHidden(true);
                this.page6.setHidden(true);
                this.page7.setHidden(true);
                this.page8.setHidden(true);
                this.page9.setHidden(true);
                this.page10.setHidden(true);
                break;
            }
            case BackstoryScreenEvent.PAGE4: {
                this.page1.setHidden(true);
                this.page2.setHidden(true);
                this.page3.setHidden(true);
                this.page4.setHidden(false);
                this.page5.setHidden(true);
                this.page6.setHidden(true);
                this.page7.setHidden(true);
                this.page8.setHidden(true);
                this.page9.setHidden(true);
                this.page10.setHidden(true);
                break;
            }
            case BackstoryScreenEvent.PAGE5: {
                this.page1.setHidden(true);
                this.page2.setHidden(true);
                this.page3.setHidden(true);
                this.page4.setHidden(true);
                this.page5.setHidden(false);
                this.page6.setHidden(true);
                this.page7.setHidden(true);
                this.page8.setHidden(true);
                this.page9.setHidden(true);
                this.page10.setHidden(true);
                break;
            }
            case BackstoryScreenEvent.PAGE6: {
                this.page1.setHidden(true);
                this.page2.setHidden(true);
                this.page3.setHidden(true);
                this.page4.setHidden(true);
                this.page5.setHidden(true);
                this.page6.setHidden(false);
                this.page7.setHidden(true);
                this.page8.setHidden(true);
                this.page9.setHidden(true);
                this.page10.setHidden(true);
                break;
            }
            case BackstoryScreenEvent.PAGE7: {
                this.page1.setHidden(true);
                this.page2.setHidden(true);
                this.page3.setHidden(true);
                this.page4.setHidden(true);
                this.page5.setHidden(true);
                this.page6.setHidden(true);
                this.page7.setHidden(false);
                this.page8.setHidden(true);
                this.page9.setHidden(true);
                this.page10.setHidden(true);
                break;
            }
            case BackstoryScreenEvent.PAGE8: {
                this.page1.setHidden(true);
                this.page2.setHidden(true);
                this.page3.setHidden(true);
                this.page4.setHidden(true);
                this.page5.setHidden(true);
                this.page6.setHidden(true);
                this.page7.setHidden(true);
                this.page8.setHidden(false);
                this.page9.setHidden(true);
                this.page10.setHidden(true);
                break;
            }
            case BackstoryScreenEvent.PAGE9: {
                this.page1.setHidden(true);
                this.page2.setHidden(true);
                this.page3.setHidden(true);
                this.page4.setHidden(true);
                this.page5.setHidden(true);
                this.page6.setHidden(true);
                this.page7.setHidden(true);
                this.page8.setHidden(true);
                this.page9.setHidden(false);
                this.page10.setHidden(true);
                break;
            }
            case BackstoryScreenEvent.PAGE10: {
                this.page1.setHidden(true);
                this.page2.setHidden(true);
                this.page3.setHidden(true);
                this.page4.setHidden(true);
                this.page5.setHidden(true);
                this.page6.setHidden(true);
                this.page7.setHidden(true);
                this.page8.setHidden(true);
                this.page9.setHidden(true);
                this.page10.setHidden(false);
                break;
            }
            default: {
                throw new Error(`Unhandled event caught in SplashScreen: "${event.type}"`);
            }
        }
    }
}

