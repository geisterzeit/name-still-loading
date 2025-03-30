import { Behaviour, GameObject, getComponentInChildren, InputField, LogType, SceneSwitcher, serializable, showBalloonMessage } from "@needle-tools/engine";

export class MainMenu extends Behaviour
{
    @serializable(GameObject)
    mainScreen: GameObject | null = null;
    @serializable(GameObject)
    statsScreen: GameObject | null = null;
    @serializable(GameObject)
    highscoreScreen: GameObject | null = null;

    private switcher?: SceneSwitcher;
    
    async awake()
    {
        //this.sceneSwitcher = findObjectOfType(SceneSwitcher);
        //this.switcher ??= GameObject.findObjectOfType(SceneSwitcher)!;
        if(this.mainScreen)
        {
            this.mainScreen.activeSelf = true;
        }
        if(this.statsScreen)
        {
            this.statsScreen.activeSelf = false;
        }
        if(this.highscoreScreen)
        {
            this.highscoreScreen.activeSelf = false;
        }
    }

    public playGame(): void
    {
        let playerName = getComponentInChildren(this.gameObject, InputField);
        if(playerName && playerName.text.length > 0)
        {
            console.log(playerName);
            showBalloonMessage("Nice name!", LogType.Warn);
            //TODO Name in DB?
            this.switcher ??= this.get();
            this.switcher?.selectNext();
        }
        else
        {
            showBalloonMessage("Please insert your name!", LogType.Warn);
        }
    }

    public exitGame(): void
    {
        window.close();
    }

    public displayStats(): void
    {
        showBalloonMessage("Hier könnten Ihre Stats stehen!", LogType.Warn);
        if(this.statsScreen && this.mainScreen)
        {
            this.mainScreen.activeSelf = false;
            this.statsScreen.activeSelf = true;
        }
    }

    public displayHighscore(): void
    {
        showBalloonMessage("Hier könnten die Highscores aufgelistet sein!", LogType.Warn);
        if(this.highscoreScreen && this.mainScreen)
        {
            this.mainScreen.activeSelf = false;
            this.highscoreScreen.activeSelf = true;
        }
    }

    public displayMain(): void
    {
        if(this.highscoreScreen && this.statsScreen && this.mainScreen)
        {
            this.highscoreScreen.activeSelf = false;
            this.statsScreen.activeSelf = false;
            this.mainScreen.activeSelf = true;
        }
    }

    public goMainMenu(): void
    {
        this.context.time.timeScale = 1;
        this.switcher ??= this.get();
        this.switcher?.selectNext();
        //TODO neuen Raum??
    }

    private get(): SceneSwitcher
    {
        return GameObject.findObjectOfType(SceneSwitcher)!;
    }
}