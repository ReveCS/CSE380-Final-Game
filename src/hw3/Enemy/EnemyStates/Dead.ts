import { EnemyStates, EnemyAnimations } from "../EnemyController";
import EnemyState from "./EnemyState";

export default class Dead extends EnemyState {

	public onEnter(options: Record<string, any>): void {
        this.owner.animation.play(EnemyAnimations.DYING);
	}

    // Empty update method - if the enemy is dead, don't update anything
    public update(deltaT: number): void {}

    public onExit(): Record<string, any> { return {}; }
}