import { Behaviour, serializable } from "@needle-tools/engine";
import { EnemyManager } from "./EnemyManager";
import { Gold } from "../Gold";

export class Enemy extends Behaviour {
  @serializable()
  health: number = 100;

  start(): void {
    EnemyManager.registerEnemy(this.gameObject);
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
    Gold.addGold(10);
  }
}
