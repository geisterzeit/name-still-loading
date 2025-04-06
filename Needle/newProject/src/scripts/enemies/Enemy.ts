import {
  Behaviour,
  serializable,
  syncField,
  RectTransform,
} from "@needle-tools/engine";
import { EnemyManager } from "./EnemyManager";
import { Gold } from "../Gold";
import { ElementType } from "../element-system/ElementType";
import { Vector3 } from "three";
import WaveManager from "../WaveManager";

export class Enemy extends Behaviour {
  @serializable()
  @syncField()
  health: number = 150;

  @serializable()
  shieldHealth: number = 100;

  @serializable()
  type: number = ElementType.FIRE;

  private maxHealth = 0;
  private maxShield = 0;
  private healthDisplay: RectTransform | null = null;
  private shieldDisplay: RectTransform | null = null;

  @serializable()
  deathGold: number = 10;

  start(): void {
    this.health = this.health + (this.health * WaveManager.getWaveCount() * 0.75);
    this.maxHealth = this.health;
    this.maxShield = this.shieldHealth;
    EnemyManager.registerEnemy(this.gameObject);
    this.healthDisplay =
      this.gameObject.getComponentsInChildren(RectTransform).find(obj => obj.name === "HealthBar") ?? null;
    this.shieldDisplay =
      this.gameObject.getComponentsInChildren(RectTransform).find(obj => obj.name === "ShieldBar") ?? null;
  }

  onDestroy(): void {
    EnemyManager.unregisterEnemy(this.gameObject);
  }

  takeDamage(damage: number): boolean {
    if (this.shieldHealth > 0) {
      this.shieldHealth -= damage;
    } else {
      this.health -= damage;
    }

    if (this.health <= 0) {
      this.die();
      return true;
    }
    return false;
  }

  updateDisplays() {
    let oldHealth = this.health;
    let oldShield = this.shieldHealth;

    console.log(this.shieldDisplay)
    console.log(this.healthDisplay)

    if (this.shieldDisplay) {
      this.shieldDisplay.scale?.add(
        new Vector3(
          this.shieldHealth / this.maxShield - oldShield / this.maxShield,
          0,
          0
        )
      );
    }
    if (this.healthDisplay) {
      this.healthDisplay.scale?.add(
        new Vector3(
          this.health / this.maxHealth - oldHealth / this.maxHealth,
          0,
          0
        )
      );
    }
  }

  private die(): void {
    this.gameObject.destroy();
    Gold.addGold(this.deathGold / 4);
  }
}
