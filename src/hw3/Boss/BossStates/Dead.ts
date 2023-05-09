import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import { BossAnimations, BossTweens} from "../BossController";
import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";
import BossState from "./BossState";
import { PlayerTweens } from "../../Player/PlayerController";
/**
 * The Dead state for the player's FSM AI. 
 */

export default class Dead extends BossState {
    // Trigger the player's death animation when we enter the dead state
    public onEnter(options: Record<string, any>): void {
        let deathSound = this.owner.getScene().getDeathSoundKey();
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: deathSound, loop: false, holdReference: false});
        this.owner.animation.play(BossAnimations.DYING);
        this.owner.animation.queue(BossAnimations.DEATH,true);
        this.parent.player.tweens.play(PlayerTweens.BOSS_DEATH);
        
    }

    // Ignore all events from the rest of the game
    public handleInput(event: GameEvent): void { }

    // Empty update method - if the player is dead, don't update anything
    public update(deltaT: number): void {}

    public onExit(): Record<string, any> { return {}; }
    
}