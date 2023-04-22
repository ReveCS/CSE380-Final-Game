import { HW3Events } from "../../Events/HW3Events";
import { EnemyStates, EnemyAnimations } from "../EnemyController";
import EnemyState from "./EnemyState";

export default class Dead extends EnemyState {

	public onEnter(options: Record<string, any>): void {
        this.owner.animation.play(EnemyAnimations.DYING);
	}

    public update(deltaT: number): void {
        if (!this.owner.animation.isPlaying(EnemyAnimations.DYING)) {
            this.owner.destroy();
            this.emitter.fireEvent(HW3Events.ENEMY_KILLED);
        }
    }

    public onExit(): Record<string, any> { return {}; }
}