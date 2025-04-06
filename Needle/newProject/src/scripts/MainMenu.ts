import { Behaviour, GameObject, getComponentInChildren, getComponentsInChildren, InputField, LogType, OwnershipModel, SceneSwitcher, serializable, showBalloonMessage, SyncedRoom } from "@needle-tools/engine";
import { Database } from "./Database";
import { KillCounter } from "./KillCounter";

export class MainMenu extends Behaviour {
    @serializable(GameObject)
    mainScreen: GameObject | null = null;
    @serializable(GameObject)
    statsScreen: GameObject | null = null;

    private switcher?: SceneSwitcher;
    private syncedRoom?: SyncedRoom;

    async awake() {
        //this.sceneSwitcher = findObjectOfType(SceneSwitcher);
        //this.switcher ??= GameObject.findObjectOfType(SceneSwitcusername = playerName.text
        if (this.mainScreen) {
            this.mainScreen.activeSelf = true;
        }
        if (this.statsScreen) {
            this.statsScreen.activeSelf = false;
        }
    }

    public playGame(): void {
        let playerName = getComponentInChildren(this.gameObject, InputField);
        if (playerName && playerName.text.length > 0) {
            //showBalloonMessage("Nice name!", LogType.Warn);
            Database.instance.username = playerName.text

            this.syncedRoom ??= this.getRoom();
            console.log(this.syncedRoom);

            this.switcher ??= this.get();
            this.switcher?.selectNext();
        }
        else {
            showBalloonMessage("Please insert your name!", LogType.Warn);
        }
    }

    public exitGame(): void {
        this.syncedRoom ??= this.getRoom();
    }

    public displayStats(): void {
        let playerName = getComponentInChildren(this.gameObject, InputField);

        if (playerName && playerName.text.length > 0) {
            if (this.statsScreen && this.mainScreen) {
                Database.instance.username = playerName.text
                getComponentsInChildren(this.statsScreen, KillCounter).forEach((counter) => {
                    counter.loadData()
                });
                this.mainScreen.activeSelf = false;
                this.statsScreen.activeSelf = true;
            }
        }
        else {
            showBalloonMessage("Please insert your name!", LogType.Warn);
        }
    }

    public displayMain(): void {
        if (this.statsScreen && this.mainScreen) {
            this.statsScreen.activeSelf = false;
            this.mainScreen.activeSelf = true;
        }
    }

    public goMainMenu(): void {
        this.context.time.timeScale = 1;
        this.switcher ??= this.get();
        this.switcher?.selectNext();

        this.syncedRoom ??= this.getRoom();
        this.syncedRoom.tryJoinRandomRoom();
    }

    private get(): SceneSwitcher {
        return GameObject.findObjectOfType(SceneSwitcher)!;
    }

    private getRoom(): SyncedRoom {
        return GameObject.findObjectOfType(SyncedRoom)!;
    }
}