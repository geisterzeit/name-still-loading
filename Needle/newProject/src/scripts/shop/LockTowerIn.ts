import { Behaviour, DragControls } from "@needle-tools/engine";
import { Tower } from "../Tower";
import { Vector3 } from "three";

export class LockTowerIn extends Behaviour
{
    lockIn(): void
    {
        console.log(this.gameObject);
        console.log(this.gameObject.parent);
        console.log(this.gameObject.children);
        this.gameObject.addComponent(Tower);
        this.gameObject.getObjectByName("Radius")?.destroy();
        this.gameObject.getObjectByName("Canvas")?.destroy();
        this.gameObject.getComponentInChildren(DragControls)?.destroy();
        let tmp = new Vector3;
        console.log(this.gameObject.getWorldPosition(tmp));
        console.log(this.gameObject.worldPosition);
        console.log(this.gameObject.position);
    }
}