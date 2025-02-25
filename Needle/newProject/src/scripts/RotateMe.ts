import { Behaviour } from "@needle-tools/engine";

export class RotateMe extends Behaviour{
    
    start(): void {
        console.log("Hallo I bims 1 drehender Würfel")
    }
    
    update(): void {
        this.gameObject.rotateY(this.context.time.deltaTime);
    }
}