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
            this.emitter.fireEvent(HW3Events.ENEMY_KILLED, {enemyType: this.owner.imageId});
        }
        else {
            // Update the vertical velocity of the Enemy
            this.parent.velocity.y += this.gravity*deltaT;
            // Move the Enemy
            this.owner.move(this.parent.velocity.scaled(deltaT));
        }
    }

    public onExit(): Record<string, any> { return {}; }
}