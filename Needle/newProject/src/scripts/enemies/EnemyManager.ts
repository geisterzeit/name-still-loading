import { GameObject } from "@needle-tools/engine";

export class EnemyManager {
  static enemies: GameObject[] = [];

  static registerEnemy(enemy: GameObject): void {
    this.enemies.push(enemy);
  }

  static unregisterEnemy(enemy: GameObject): void {
    this.enemies = this.enemies.filter((e) => e !== enemy);
  }
}
