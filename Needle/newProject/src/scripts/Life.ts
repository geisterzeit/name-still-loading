import { Behaviour, GameObject, SceneSwitcher, serializable, showBalloonMessage, SyncedRoom, syncField, Text } from "@needle-tools/engine"

export class Life extends Behaviour
{
    private lifeDisplay: Text | null = null;
    @serializable(GameObject)
    defeatDisplay: GameObject |null = null;

    @syncField()
    private currentLife: number = 1;

    static instance: Life;

    start(): void {
        if(this.defeatDisplay)
        {
            this.defeatDisplay.activeSelf = false;
        }

        this.lifeDisplay = this.gameObject.getComponent(Text);
        this.currentLife = Number(this.lifeDisplay?.text);
        Life.instance = this;
    }

    public static loseLife(lifeLost: number)
    {
        Life.instance.currentLife -= lifeLost;
        if(Life.instance.currentLife <= 0)
        {
            console.log("VERLORRRRRRRRRRRRRRRRRREN!!!");
            Life.instance.lost();
        }
    }
    
    update(): void {
        if(this.lifeDisplay)
        {
            this.lifeDisplay.text = this.currentLife.toString();
        }
        if(Life.instance.currentLife <= 0)
            this.lost();
    }

    private lost(): void
    {
        this.context.time.timeScale = 0;
        if(this.defeatDisplay)
        {
            this.defeatDisplay.activeSelf = true;
        }
    }
}