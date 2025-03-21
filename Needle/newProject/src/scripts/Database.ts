import { Behaviour, Text } from "@needle-tools/engine";

const DATABASE_URL = "https://worker-still-loading.mear.workers.dev/"
const HEADERS = {
    'Content-Type': 'application/json'
}

interface TowerStats {
    [towerId: string]: number;
}

export class Database extends Behaviour {
    private username: string = ""
    private towerStats: TowerStats = {};

    async init(username: string): Promise<Database> {
        this.username = username;
        await this.loadUserData();
        return this;
    }

    private async loadUserData() {
        try {
            const response = await Database.getValue(this.username);
            if (response.ok) {
                const data = await response.json();
                this.towerStats = data || {};
                console.log(this.towerStats)
            } else {
                this.towerStats = {};
            }
        } catch (error) {
            console.error("Failed to load user data:", error);
            this.towerStats = {};
        }
    }

    async getUserTowerStats(): Promise<TowerStats> {
        return this.towerStats;
    }

    async getTowerKillCount(towerId: string): Promise<number> {
        return this.towerStats[towerId] || 0;
    }

    async updateTowerKills(towerId: string, additionalKills: number): Promise<number> {
        if (!this.towerStats[towerId]) {
            this.towerStats[towerId] = 0;
        }

        this.towerStats[towerId] += additionalKills;

        await this.saveUserData();

        return this.towerStats[towerId];
    }

    private async saveUserData() {
        try {
            if (this.username) {
                await Database.setValue(this.username, this.towerStats);
            }
        } catch (error) {
            console.error("Failed to save user data:", error);
        }
    }

    static async getValue(key: string) {
        return fetch(`${DATABASE_URL}?key=${encodeURIComponent(key)}`, { headers: HEADERS });
    }

    static async setValue(key: string, value: any) {
        return fetch(`${DATABASE_URL}?key=${encodeURIComponent(key)}`, {
            method: 'PUT',
            headers: HEADERS,
            body: JSON.stringify(value)
        });
    }
}