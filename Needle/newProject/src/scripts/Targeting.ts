import { Behaviour, GameObject } from "@needle-tools/engine";

export class Targeting extends Behaviour {
    target(firstEnemy: GameObject) {
        let target = firstEnemy.worldPosition
        target.x = 0
        this.gameObject.lookAt(target)
    }
}