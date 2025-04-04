import { Behaviour, syncField } from "@needle-tools/engine";

const BASE_ENEMY_TYPES = [0, 1, 2];
const SPECIAL_ENEMY_TYPES = [3, 4, 5, 6];

class WaveManager extends Behaviour {
  private selectedBaseEnemyTypes: number[];
  private selectedSpecialEnemyTypes: number[];

  @syncField()
  waveCount = 0;

  private static waveScaler: number = 0;

  constructor() {
    super();
    this.selectedBaseEnemyTypes = [
      this.pickRandomBaseEnemyType(),
      this.pickRandomBaseEnemyType(),
    ];
    this.selectedSpecialEnemyTypes = [
      this.pickRandomSpecialEnemyType(),
      this.pickRandomSpecialEnemyType(),
    ];

    console.log(this.selectedBaseEnemyTypes);
    console.log(this.selectedSpecialEnemyTypes);
  }

  private pickRandomBaseEnemyType(): (typeof BASE_ENEMY_TYPES)[number] {
    return this.getRandomElement(BASE_ENEMY_TYPES);
  }

  private pickRandomSpecialEnemyType(): (typeof SPECIAL_ENEMY_TYPES)[number] {
    return this.getRandomElement(SPECIAL_ENEMY_TYPES);
  }

  incrementWave() {
    this.waveCount++;
    WaveManager.waveScaler = this.waveCount;
  }

  private getRandomElement<T>(array: Array<T>): T {
    const randomIndex = Math.floor(Math.random() * array.length);

    return array[randomIndex];
  }

  private shuffleArray<T>(array: Array<T>): Array<T> {
    let copy = array.slice();
    let currentIndex = copy.length;

    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [copy[currentIndex], copy[randomIndex]] = [
        copy[randomIndex],
        copy[currentIndex],
      ];
    }
    return copy;
  }

  private getBaseEenemiesForWave(): Array<number> {
    let baseEnemies: Array<number> = [];
    for (let i = 0; i < this.getWaveBaseEnemyCount(); i++) {
      baseEnemies.push(this.getRandomElement(this.selectedBaseEnemyTypes));
    }
    return baseEnemies;
  }

  private getSpecialEnemiesForWave(): Array<number> {
    let baseEnemies: Array<number> = [];

    for (let i = 0; i < this.getWaveSpecialEnemyCount(); i++) {
      baseEnemies.push(this.getRandomElement(this.selectedSpecialEnemyTypes));
    }

    return baseEnemies;
  }

  private getWaveBaseEnemyCount(): number {
    return 20 + 20 * this.waveCount * 0.7;
  }

  private getWaveSpecialEnemyCount(): number {
    return 8 * this.waveCount;
  }

  getWave() {
    const interval = this.waveCount < 3 ? 1 : 0.5;

    let enemies: Array<number> = [];
    enemies.push(...this.getBaseEenemiesForWave());

    if (this.waveCount > 3) {
      const specialEnemies = this.getSpecialEnemiesForWave();
      enemies.push(...specialEnemies);
    }

    return { interval: interval, enemies: this.shuffleArray(enemies) };
  }

  public static getWaveCount(): number
  {
    return WaveManager.waveScaler;
  }
}

export default WaveManager;
