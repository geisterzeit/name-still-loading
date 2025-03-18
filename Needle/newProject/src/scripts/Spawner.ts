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

async function waitForSeconds(seconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000)); // Sekunden in Millisekunden umwandeln
}

export class Spawner extends Behaviour 
{
  /** Das Prefab des Gegners, das in dieser Welle gespawnt wird */
  @serializable(AssetReference)
  enemies: AssetReference[] = [];
  @serializable()
  enemyCount: number[] = [];
  @serializable()
  spawnInterval: number[] = [];

  @syncField()
  private currentWave: number = 0;

  /**Aktuelle Welle Display */
  @serializable(Text)
  currentWaveDisplay!: Text;

  @syncField()
  private currentState: String = "beforeWave";

  start(): void {
    this.currentWave = 0;
  }

  private async spawnWave(): Promise<void> 
  {
    let lastCount = 1; // Standardanzahl Gegner
    let lastInterval = 1; // Standardintervall
    this.currentState = "spawning";

    const enemyThisWave = this.enemies[this.currentWave];

    lastCount = this.enemyCount[this.currentWave] ?? lastCount;
    lastInterval = this.spawnInterval[this.currentWave] ?? lastInterval;
    console.log(`Starte Wave ${this.currentWave + 1}: ${lastCount} Gegner, ${lastInterval}s Abstand`);

    for (let i = 0; i < lastCount; i++) 
    {
      await enemyThisWave.instantiateSynced({
        position: Wegpunkte.points[0],
        parent: this.gameObject,
      });
      await waitForSeconds(lastInterval);
    }    
    this.currentState = "enemiesAlive";
  }

  public initiateWave(): void 
  {
    console.log(SyncedRoom);
    if(this.currentState == "beforeWave" || this.currentState == "betweenWaves") 
    {
      this.spawnWave();
    }
  }

  private gonextWave(): void
  {
    this.currentState = "betweenWaves";
    
    Gold.addGold(50*(this.currentWave+1)); //TODO Balancing?

    if(this.enemies.length > (this.currentWave+1))
    {
      this.currentWave++;
    }
    else
    {
      console.log("Hurra du bist durch, fange wieder von Wave 1 an :) (Bitte töte mich)")
      this.currentWave = 0;
    }
  }

  update(): void 
  {
    this.currentWaveDisplay.text = `Welle: ${this.currentWave+1}`;
    if(EnemyManager.enemies.length == 0 && this.currentState == "enemiesAlive")
      this.gonextWave();
  }    
}
