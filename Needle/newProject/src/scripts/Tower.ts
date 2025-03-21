import { Behaviour, GameObject, serializable } from "@needle-tools/engine";
import { Vector3 } from "three";
import { EnemyManager } from "./enemies/EnemyManager";
import { Enemy } from "./enemies/Enemy";
import { calculateDamage } from "./element-system/DamageUtils";
import { ElementType } from "./element-system/ElementType";

export class Tower extends Behaviour {
  @serializable()
  range: number = 2;
  @serializable()
  damage: number = 50;
  @serializable()
  fireRatePerSecond: number = 1;
  private fireCooldown: number = 0;
  private enemiesInRange: GameObject[] = [];

  start(): void {
    console.log("Tower startet!");
  }

  update(): void {
    if (this.fireCooldown > 0) {
      this.fireCooldown -= this.context.time.deltaTime;
    }

    if (this.enemiesInRange.length > 0 && this.fireCooldown <= 0) {
      this.shoot(this.enemiesInRange[0]);
      this.fireCooldown = 1 / this.fireRatePerSecond;
    }

    this.detectEnemiesInRange();
  }

  detectEnemiesInRange() {
    this.enemiesInRange = [];

    for (let enemy of EnemyManager.enemies) {
      const distance = this.gameObject.position.distanceTo(enemy.position);
      if (distance <= this.range) {
        this.enemiesInRange.push(enemy);
      }
    }
  }

  shoot(target: GameObject) {
    console.log("Tower schießt auf", target.name);

    // Get positions using Needle Engine's positioning system
    const towerPosition = this.gameObject.position; // Tower's position
    const enemyPosition = target.position; // Enemy's position

    // Calculate distance using Three.js
    const distance = new Vector3()
      .subVectors(towerPosition, enemyPosition)
      .length();

    // Destroy enemy if it is too close
    if (distance < this.range) {
      const enemy = target.getComponent(Enemy);
      if (enemy) {
        enemy.takeDamage(
          calculateDamage(this.damage, ElementType.FIRE, enemy.type)
        );
      }
      return;
    }
  }
}
