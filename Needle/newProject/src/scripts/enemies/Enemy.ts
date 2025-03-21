import { Behaviour, serializable, syncField, Text } from "@needle-tools/engine";
import { EnemyManager } from "./EnemyManager";
import { Gold } from "../Gold";
import { ElementType } from "../element-system/ElementType";

export class Enemy extends Behaviour {
  @serializable()
  @syncField()
  health: number = 100;

  private healthDisplay: Text | null = null;

  @serializable()
  deathGold: number = 10;

  @serializable()
  type: number = ElementType.FIRE;

  start(): void {
    EnemyManager.registerEnemy(this.gameObject);
    this.healthDisplay = this.gameObject.getComponentInChildren(Text);
  }

  update(): void {
    if(this.healthDisplay)
      this.healthDisplay.text = this.health.toString();
    console.log(this.healthDisplay);
  }

  onDestroy(): void {
    EnemyManager.unregisterEnemy(this.gameObject);
  }

  takeDamage(damage: number): void {
    this.health -= damage;

    if (this.health <= 0) {
      this.die();
    }
  }

  private die(): void {
    this.gameObject.destroy();
    Gold.addGold(this.deathGold);
  }
}
