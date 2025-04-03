import {
  AssetReference,
  Behaviour,
  DragControls,
  IPointerClickHandler,
  LogType,
  ParticleSystem,
  PointerEventData,
  serializable,
  showBalloonMessage,
} from "@needle-tools/engine";
import { Object3D, Vector3 } from "three";
import { Tower } from "../Tower";
import { Gold } from "../Gold";

export class BuyTower extends Behaviour implements IPointerClickHandler {
  @serializable(AssetReference)
  tower: AssetReference | null = null;
  @serializable()
  towerCost: number = 50;
  @serializable(ParticleSystem)
  spawnFog: ParticleSystem | null = null;
  @serializable(AssetReference)
  radius: AssetReference | null = null;

  private spawnedTower: Object3D | null = null;

  // Make sure to have an ObjectRaycaster component in the parent hierarchy
  onPointerClick(_args: PointerEventData) {
    if (Gold.getGold() >= this.towerCost) {
      //console.log(this.gameObject.position);
      if(this.spawnFog)
      {
        this.spawnFog.play();
      }
      this.tower
        ?.instantiateSynced({
          parent: this.gameObject.parent?.parent!,
          position: new Vector3(
            this.gameObject.position.x,
            0,
            this.gameObject.position.z
          ),
        })
        .then(
          (newTower) => (
            newTower?.getObjectByName("Radius")?.scale.set(newTower?.getComponent(Tower)?.getRange()!,0.000001,newTower?.getComponent(Tower)?.getRange()!),
            newTower?.getComponent(Tower)?.destroy(),
            (this.spawnedTower = newTower)
          )
        );
      Gold.addGold(this.towerCost * -1);
      
    } else {
      showBalloonMessage(
        "You don't have enought Gold!\n" +
          -1 * (Gold.getGold() - this.towerCost) +
          " more is needed!",
        LogType.Warn
      );
    }
  }
}
