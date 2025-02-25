import { Behaviour } from "@needle-tools/engine";
import { EnemyManager } from "./EnemyManager";

export class Enemy extends Behaviour {
  start(): void {
    EnemyManager.registerEnemy(this.gameObject);
  }

  onDestroy(): void {
    EnemyManager.unregisterEnemy(this.gameObject);
  }
}
