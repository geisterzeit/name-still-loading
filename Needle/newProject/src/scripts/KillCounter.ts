import { Behaviour, serializable, Text } from "@needle-tools/engine";
import { Database } from "./Database";

export class KillCounter extends Behaviour {
    @serializable()
    towerId: number = 1;

    start(): void {
        this.loadData()
    }

    loadData(): void {
        let textDisplay = this.gameObject.getComponent(Text);
        Database.instance.loadUserData().then(() => {
            textDisplay!.text = Database.instance.getTowerKillCount(this.towerId).toString()
        })
    }
}