import { EnemyStates, EnemyAnimations } from "../EnemyController";
import EnemyState from "./EnemyState";

export default class Dead extends EnemyState {

	public onEnter(options: Record<string, any>): void {
        this.owner.animation.play(EnemyAnimations.DYING);
	}

    public update(deltaT: number): void {
        if (!this.owner.animation.isPlaying(EnemyAnimations.DYING)) {
            this.owner.destroy();
        }
    }

    public onExit(): Record<string, any> { return {}; }
}