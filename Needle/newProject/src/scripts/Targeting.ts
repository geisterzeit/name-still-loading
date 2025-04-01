import { Behaviour, GameObject } from "@needle-tools/engine";
import { Vector3 } from "three";

export class Targeting extends Behaviour {
    target(firstEnemy: GameObject) {
        let target = new Vector3()
            .subVectors(firstEnemy.position, this.gameObject.position)

        target.y = 0.3
        this.gameObject.lookAt(target)
    }
}