import { AssetReference, Behaviour, DragControls, IPointerClickHandler, PointerEventData, serializable } from "@needle-tools/engine";
import { Object3D, Vector3 } from "three";
import { Tower } from "../Tower";

export class BuyTower extends Behaviour implements IPointerClickHandler {

    @serializable(AssetReference)
    tower: AssetReference | null = null;

    private spawnedTower: Object3D | null = null;

    // Make sure to have an ObjectRaycaster component in the parent hierarchy
    onPointerClick(_args: PointerEventData) 
    {
        this.tower?.instantiateSynced().then((newTower)=>(
            newTower!.parent = this.gameObject.parent,
            newTower?.position.add(new Vector3(0,1,0).add(this.gameObject.position)),
            newTower?.getObjectByName("Tower")?.addComponent(DragControls),
            newTower?.getComponent(Tower)?.destroy(),
            this.spawnedTower = newTower
        ));
    }

    public lockIn(): void
    {
        if(this.spawnedTower)
        {
            console.log(this.spawnedTower);
            this.spawnedTower.addComponent(Tower);
            this.spawnedTower.getObjectByName("Radius")?.destroy();
            this.spawnedTower.getComponent(DragControls)?.destroy();
            console.log(this.spawnedTower);
        }
    }
}