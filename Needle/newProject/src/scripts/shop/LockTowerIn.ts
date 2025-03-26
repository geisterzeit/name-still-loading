import { Behaviour, DragControls } from "@needle-tools/engine";
import { Tower } from "../Tower";

export class LockTowerIn extends Behaviour
{
    lockIn(): void
    {
        this.gameObject.addComponent(Tower);
        this.gameObject.getObjectByName("Radius")?.destroy();
        this.gameObject.getObjectByName("Canvas")?.destroy();
        this.gameObject.getComponentInChildren(DragControls)?.destroy();
    }
}