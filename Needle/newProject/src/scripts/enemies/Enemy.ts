import { Behaviour, Image, serializable, syncField, ObjectOptions, RectTransform } from "@needle-tools/engine";
import { EnemyManager } from "./EnemyManager";
import { Gold } from "../Gold";
import { ElementType } from "../element-system/ElementType";
import { Vector3 } from "three";

export class Enemy extends Behaviour {
  @serializable()
  @syncField()
  health: number = 150;

  private maxHealth = 0;
  private healthDisplay: RectTransform | null = null;
  private backgroundDisplay: RectTransform | null = null;

  @serializable()
  deathGold: number = 10;

  @serializable()
  type: number = ElementType.FIRE;

  start(): void {
    this.maxHealth = this.health;
    EnemyManager.registerEnemy(this.gameObject);
    this.backgroundDisplay = this.gameObject.getComponentsInChildren(RectTransform)[1];
    this.healthDisplay = this.gameObject.getComponentsInChildren(RectTransform)[2];
  }

  onDestroy(): void {
    EnemyManager.unregisterEnemy(this.gameObject);
  }

  takeDamage(damage: number): void {
    let oldHealth = this.health;
    this.health -= damage;
    if(this.healthDisplay)
    {
      this.healthDisplay.scale.add(new Vector3((this.health / this.maxHealth - oldHealth / this.maxHealth),0,0));
    }

    if (this.health <= 0) {
      this.die();
    }
  }

  private die(): void {
    this.gameObject.destroy();
    Gold.addGold(this.deathGold);
  }
}
