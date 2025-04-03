import {
  Behaviour,
  DragControls,
  GameObject,
  serializable,
} from "@needle-tools/engine";
import { Vector3 } from "three";
import { EnemyManager } from "./enemies/EnemyManager";
import { Enemy } from "./enemies/Enemy";
import { calculateDamage } from "./element-system/DamageUtils";
import { ElementType } from "./element-system/ElementType";
import { Targeting } from "./Targeting";
import { Database } from "./Database";

export class Tower extends Behaviour {
  @serializable()
  active: boolean = true;
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

  update(): void {
    if (this.active) {
      if (this.fireCooldown > 0) {
        this.fireCooldown -= this.context.time.deltaTime;
      }

      this.detectEnemiesInRange();

      if (!this.enemiesInRange || !(this.enemiesInRange.length > 0)) {
        return;
      }

      let firstEnemy = this.enemiesInRange[0];

      if (this.fireCooldown <= 0) {
        this.shoot(firstEnemy);
        this.fireCooldown = 1 / this.fireRatePerSecond;
      }

      if (this.gameObject.getComponentsInChildren(Targeting).length > 0) {
        this.gameObject
          .getComponentsInChildren(Targeting)[0]
          .target(firstEnemy);
      }
    }
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
        const damage = calculateDamage(this.damage, this.type, enemy.type);

        let enemyDied = enemy.takeDamage(damage);
        if (enemyDied) {
          Database.instance.updateTowerKills(this.type, 1)
        }
      }
      return;
    }
  }

  lockIn(): void {
    this.gameObject.getObjectByName("Radius")?.destroy();
    this.gameObject.getObjectByName("Canvas")?.destroy();
    this.gameObject.getComponentInChildren(DragControls)?.destroy();
    this.active = true;
  }

  private isEnemyImmune(enemy: Enemy): boolean {
    return (
      (this.type !== ElementType.INVISIBLE &&
        enemy.type === ElementType.INVISIBLE) ||
      (this.type === ElementType.INVISIBLE &&
        enemy.type !== ElementType.INVISIBLE) ||
      (this.type !== ElementType.CANNON && enemy.shieldHealth > 0) ||
      (this.type === ElementType.CANNON && enemy.shieldHealth <= 0)
    );
  }

  public getRange(): number {
    return this.range * 2;
  }
}
