import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import { PlayerAnimations, PlayerTweens } from "../PlayerController";
import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";
import PlayerState from "./PlayerState";
import Timer from "../../../Wolfie2D/Timing/Timer";
import { HW3Events } from "../../Events/HW3Events";
/**
 * The Dead state for the player's FSM AI. 
 */

export default class Dead extends PlayerState {
    // Trigger the player's death animation when we enter the dead state
    public onEnter(options: Record<string, any>): void {
        let deathSound = this.owner.getScene().getDeathSoundKey();
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: deathSound, loop: false, holdReference: false});
        this.owner.animation.play(PlayerAnimations.DYING);
        this.owner.animation.queue(PlayerAnimations.DEATH,true);
        this.owner.tweens.play(PlayerTweens.DEATH);   
        
    }

    // Ignore all events from the rest of the game
    public handleInput(event: GameEvent): void { }

    // Empty update method - if the player is dead, don't update anything
    public update(deltaT: number): void {}

    public onExit(): Record<string, any> { return {}; }
    
}