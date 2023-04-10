import { EnemyStates, EnemyAnimations } from "../EnemyController";
import EnemyState from "./EnemyState";
import { CombatEvents } from "../../Events/CombatEvents";

export default class Combat extends EnemyState {

	public onEnter(options: Record<string, any>): void {
        this.owner.animation.playIfNotAlready(EnemyAnimations.ATTACK_1);
		
	}

	public update(deltaT: number): void {
		super.update(deltaT);

        // After we're done attacking , go back to idle so we can check what to do next
        if (!this.owner.animation.isPlaying(EnemyAnimations.ATTACK_1)) {
			if(this.playerInCombatRange()){
				this.emitter.fireEvent(CombatEvents.ENEMY_ATTACK_PHYSICAL, { dmg: this.parent.damage });
			}
            this.finished(EnemyStates.IDLE);
        }
		
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}