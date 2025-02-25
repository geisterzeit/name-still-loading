import { AssetReference, Behaviour, serializable, WaitForSeconds } from "@needle-tools/engine";
import { Vector3 } from "three";
import { Wegpunkte } from "./Wegpunkte";

async function waitForSeconds(seconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000)); // Sekunden in Millisekunden umwandeln
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

    /** Zeit nach den einzelnen Wellen */
    @serializable()
    afterWaveCond: number = 5;

    async spawnWave(): Promise<void>
    {
        let lastCount = 1;  // Standardanzahl Gegner
        let lastInterval = 1; // Standardintervall

        for(let waveIndex = 0; waveIndex < this.enemies.length; waveIndex++)
        {
            const prefab = this.enemies[waveIndex];
            if(!prefab) 
            { 
                console.warn(`Wave ${waveIndex + 1}: Kein Prefab gefunden!`);
                continue; 
            }
            lastCount = this.enemyCount[waveIndex] ?? lastCount;
            lastInterval = this.spawnInterval[waveIndex] ?? lastInterval;
            console.log(`Starte Wave ${waveIndex + 1}: ${lastCount} Gegner, ${lastInterval}s Abstand`);

            for(let i = 0; i < lastCount; i++)
            {
                console.log(`Wave ${waveIndex + 1}: ${i+1}ter Gegner spawnt`);
                await prefab.instantiate({position: Wegpunkte.points[0], parent: this.gameObject});
                await waitForSeconds(lastInterval);
            }

            await waitForSeconds(this.afterWaveCond);
            console.log(`Wave ${waveIndex + 1} beendet!`);
        }
    }

    start(): void {
        this.spawnWave();
    }
}