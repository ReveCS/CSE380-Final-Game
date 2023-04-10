import MathUtils from "../../../Wolfie2D/Utils/MathUtils";
import { EnemyStates, EnemyAnimations } from "../EnemyController";
import EnemyState from "./EnemyState";

export default class Pathing extends EnemyState {

	public onEnter(options: Record<string, any>): void {
        this.parent.speed = this.parent.MIN_SPEED;
        this.owner.animation.playIfNotAlready(EnemyAnimations.WALK, true);
        console.log("returning")
	}

	public update(deltaT: number): void {
		super.update(deltaT);

        // Path to the player if they are in our aggro range
        if (this.playerInRange()) {
            this.finished(EnemyStates.PATHING);
        }
        // if we're at our spawn we go back to idling
        else if (this.atSpawn()) {
            this.finished(EnemyStates.IDLE);
        }
        // We handle hit state in superclass
        // Otherwise, path back to spawn
        else {
            let dir = this.owner.position.dirTo(this.parent.spawn);
            // make sure facing right direction when pathing back
            if(dir.x !== 0){
			    this.owner.invertX = MathUtils.sign(dir.x) < 0;
		    }
            this.parent.velocity.y += this.gravity*deltaT; 
            this.parent.velocity.x = dir.x * this.parent.speed
            this.owner.move(this.parent.velocity.scaled(deltaT));
        }
		
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}