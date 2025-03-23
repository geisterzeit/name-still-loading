import {
  AssetReference,
  Behaviour,
  SyncedRoom,
  Text,
  serializable,
  syncField,
} from "@needle-tools/engine";
import { Wegpunkte } from "./Wegpunkte";
import { Gold } from "./Gold";
import { EnemyManager } from "./enemies/EnemyManager";
import WaveManager from "./WaveManager";

async function waitForSeconds(seconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000)); // Sekunden in Millisekunden umwandeln
}

export class Spawner extends Behaviour {
  /** Das Prefab des Gegners, das in dieser Welle gespawnt wird */
  @serializable(AssetReference)
  enemies: AssetReference[] = [];

  @syncField()
  private currentWave: number = 0;
  private currentEnemyCount: number = 0;

  /**Aktuelle Welle Display */
  @serializable(Text)
  currentWaveDisplay!: Text;

  @syncField()
  private currentState: String = "beforeWave";
  private waveManager: WaveManager = new WaveManager();

  start(): void {
    this.currentWave = 0;
  }

  private async spawnWave(): Promise<void> {
    this.currentState = "spawning";
    const waveObject = this.waveManager.getWave()

    console.log(
      `Starte Wave ${this.currentWave + 1}: ${waveObject.enemies.length
      } Gegner, ${waveObject.interval}s Abstand`
    );

    for (let i = 0; i < waveObject.enemies.length; i++) {
      const enemyTypeId = waveObject.enemies[this.currentEnemyCount];
      const enemyThisWave = this.enemies[enemyTypeId];

      await enemyThisWave.instantiateSynced({
        position: Wegpunkte.points[0],
        parent: this.gameObject,
      });

      this.currentEnemyCount++;
      await waitForSeconds(waveObject.interval);
    }
    this.currentState = "enemiesAlive";
  }

  public initiateWave(): void {
    console.log(SyncedRoom);
    if (
      this.currentState == "beforeWave" ||
      this.currentState == "betweenWaves"
    ) {
      this.spawnWave();
    }
  }

  private gonextWave(): void {
    this.currentState = "betweenWaves";

    Gold.addGold(50 * (this.currentWave + 1))

    this.waveManager.incrementWave()
    this.currentEnemyCount = 0;
  }

  update(): void {
    this.currentWaveDisplay.text = `Welle: ${this.currentWave + 1}`;
    if (EnemyManager.enemies.length == 0 && this.currentState == "enemiesAlive")
      this.gonextWave();
  }
}
