import { PlayerStates, PlayerAnimations } from "../PlayerController";
import PlayerState from "./PlayerState";
import { CombatEvents } from "../../Events/CombatEvents";

export default class Combat extends PlayerState {

	public onEnter(options: Record<string, any>): void {
		// this.owner.collisionShape.halfSize.set(this.owner.collisionShape.x,this.owner.collisionShape.halfSize.y-7);

        this.owner.animation.playIfNotAlready(PlayerAnimations.ATTACK_1);		
	}

	public update(deltaT: number): void {
		super.update(deltaT);
        // After we're done attacking , go back to idle so we can check what to do next
        if (!this.owner.animation.isPlaying(PlayerAnimations.ATTACK_1)) {
			this.emitter.fireEvent(CombatEvents.PLAYER_ATTACK_PHYSICAL, { dmg: this.parent.damage });
			// this.owner.collisionShape.halfSize.set(20,this.owner.collisionShape.halfSize.y-7);

            this.finished(PlayerStates.IDLE);
        }
		
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}