import { PlayerStates, PlayerAnimations } from "../PlayerController";
import PlayerState from "./PlayerState";
import { CombatEvents } from "../../Events/CombatEvents";

export default class Combat extends PlayerState {

	public onEnter(options: Record<string, any>): void {
        this.owner.animation.playIfNotAlready(PlayerAnimations.ATTACK_1);
		this.emitter.fireEvent(CombatEvents.PLAYER_ATTACK_PHYSICAL, { dmg: this.parent.damage });
	}

	public update(deltaT: number): void {
		super.update(deltaT);

        // After we're done attacking , go back to idle so we can check what to do next
        if (!this.owner.animation.isPlaying(PlayerAnimations.ATTACK_1)) {
            this.finished(PlayerStates.IDLE);
        }
		
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}