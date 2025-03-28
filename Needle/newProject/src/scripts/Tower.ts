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

  @serializable()
  type: number = ElementType.FIRE;

  private fireCooldown: number = 0;
  private enemiesInRange: GameObject[] = [];

  start(): void {
    //console.log("Tower startet!");
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

    for (let target of EnemyManager.enemies) {
      const enemy = target.getComponent(Enemy);

      if (enemy) {
        // Skip enemies that are not damageable of current tower type
        if (this.isEnemyImmune(enemy)) {
          continue;
        }
        const distance = this.gameObject.position.distanceTo(target.position);
        if (distance <= this.range) {
          this.enemiesInRange.push(target);
        }
      }
    }
  }

  shoot(target: GameObject) {
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
        // TODO: Put actual Tower id
        const damage = calculateDamage(
          this.damage,
          this.type,
          enemy.type,
          this.gameObject.name
        );
        console.log(this.type, enemy.type, distance, damage);
        enemy.takeDamage(damage);
      }
      return;
    }
  }

  private isEnemyImmune(enemy: Enemy): boolean {
    return (
      (this.type !== ElementType.INVISIBLE &&
        enemy.type === ElementType.INVISIBLE) ||
      (this.type === ElementType.INVISIBLE &&
        enemy.type !== ElementType.INVISIBLE) ||
      (this.type !== ElementType.CANNON && enemy.shieldHealth > 0)
    );
  }
}
