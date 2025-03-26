import { AssetReference, Behaviour, DragControls, IPointerClickHandler, LogType, PointerEventData, serializable, showBalloonMessage  } from "@needle-tools/engine";
import { Object3D, Vector3 } from "three";
import { Tower } from "../Tower";
import { Gold } from "../Gold";

export class BuyTower extends Behaviour implements IPointerClickHandler {

    @serializable(AssetReference)
    tower: AssetReference | null = null;
    @serializable()
    towerCost: number = 50;

    private spawnedTower: Object3D | null = null;

    // Make sure to have an ObjectRaycaster component in the parent hierarchy
    onPointerClick(_args: PointerEventData) 
    {
        if(Gold.getGold() >= this.towerCost)
        {
            this.tower?.instantiateSynced().then((newTower)=>(
                newTower!.parent = this.gameObject.parent,
                newTower?.position.add(new Vector3(0,1,0).add(this.gameObject.position)),
                newTower?.getObjectByName("Tower")?.addComponent(DragControls),
                newTower?.getComponent(Tower)?.destroy(),
                this.spawnedTower = newTower
            ));
            Gold.addGold(this.towerCost*(-1));
        }
        else
        {
            showBalloonMessage("You don't have enought Gold!\n" + (-1)*(Gold.getGold()-this.towerCost) + " more is needed!", LogType.Warn);
        }
    }

    /*public lockIn(): void
    {
        if(this.spawnedTower)
        {
            this.spawnedTower.addComponent(Tower);
            this.spawnedTower.getObjectByName("Radius")?.destroy();
            this.spawnedTower.getComponent(DragControls)?.destroy();
        }
    }*/
}