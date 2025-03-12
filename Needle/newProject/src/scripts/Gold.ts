import { Behaviour, Text } from "@needle-tools/engine";

export class Gold extends Behaviour {
  private goldDisplay: Text | null = null;
  private currentGold: number = 0;

  static instance: Gold;

  start(): void {
    this.goldDisplay = this.gameObject.getComponent(Text);
    Gold.instance = this;
    Gold.addGold(150);
  }

  public static addGold(amount: number): void {
    if (Gold.instance) {
      Gold.instance.currentGold += amount;
    }
  }

  update(): void {
    if (this.goldDisplay) {
      //this.gameObject.getComponent(Text) = this.currentGold.toString();
      this.goldDisplay.text = this.currentGold.toString();
    }
  }
}
