import { Behaviour, GameObject, serializable } from "@needle-tools/engine";

export class Pause extends Behaviour
{
    @serializable(GameObject)
    setingsScreen: GameObject | null = null;
    @serializable(GameObject)
    ingameScreen: GameObject | null = null;

    public openSettings(): void
    {
        if(this.setingsScreen != null)
            this.setingsScreen.activeSelf = true;

    }

    public closeSettings(): void
    {
        if(this.setingsScreen != null)
            this.setingsScreen.activeSelf = false;

    }

    start(): void 
    {
        if(this.setingsScreen != null)
            this.setingsScreen.activeSelf = false;
    }
}