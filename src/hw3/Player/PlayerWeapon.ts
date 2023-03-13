import Particle from "../../Wolfie2D/Nodes/Graphics/Particle";
import ParticleSystem from "../../Wolfie2D/Rendering/Animations/ParticleSystem";
import Color from "../../Wolfie2D/Utils/Color";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import RandUtils from "../../Wolfie2D/Utils/RandUtils";
import Input from "../../Wolfie2D/Input/Input";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import MathUtils from "../../Wolfie2D/Utils/MathUtils";
import Navigable from "../../Wolfie2D/DataTypes/Interfaces/Navigable";
import Scene from "../../Wolfie2D/Scene/Scene";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import { HW3PhysicsGroups } from "../HW3PhysicsGroups";
import { HW3Events } from "../HW3Events";
import Stack from "../../Wolfie2D/DataTypes/Stack";
import NavigationPath from "../../Wolfie2D/Pathfinding/NavigationPath";

/**
 * // TODO get the particles to move towards the mouse when the player attacks
 * 
 * The particle system used for the player's attack. Particles in the particle system should
 * be spawned at the player's position and fired in the direction of the mouse's position.
 */
export default class PlayerWeapon extends ParticleSystem {

    public getPool(): Readonly<Array<Particle>> {
        return this.particlePool;
    }

    /**
     * @returns true if the particle system is running; false otherwise.
     */
    public isSystemRunning(): boolean { return this.systemRunning; }

    public initializePool(scene: Scene, layer: string) {
        for (let i = 0; i < this.particlePool.length; i++) {
            this.particlePool[i] = <Particle>scene.add.graphic(GraphicType.PARTICLE, layer,
                { position: this.sourcePoint.clone(), size: this.particleSize.clone(), mass: this.particleMass });
            this.particlePool[i].addPhysics();
            this.particlePool[i].setGroup(HW3PhysicsGroups.PLAYER_WEAPON);
            //this.particlePool[i].setTrigger(HW3PhysicsGroups.DESTRUCTABLE, HW3Events.PARTICLE_HIT, null);
            this.particlePool[i].isCollidable = false;
            this.particlePool[i].visible = false;
        }
    }

    /**
     * Sets the animations for a particle in the player's weapon
     * @param particle the particle to give the animation to
     */
    public setParticleAnimation(particle: Particle) {
        // Give the particle a random velocity.
        
        particle.vel = RandUtils.randVec(50, 200, -42, 42);
        //particle.vel = Input.getMousePosition();
        particle.color = Color.RED;

        // Give the particle tweens
        particle.tweens.add("active", {
            startDelay: 0,
            duration: this.lifetime,
            effects: [
                {
                    property: "alpha",
                    start: 1,
                    end: 0,
                    ease: EaseFunctionType.IN_OUT_SINE
                }
            ]
        });
    }
}