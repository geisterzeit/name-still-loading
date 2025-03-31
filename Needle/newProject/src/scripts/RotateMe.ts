import { Behaviour, serializable } from "@needle-tools/engine";

export class RotateMe extends Behaviour{
    
    @serializable()
    speed: number = 1;

    update(): void {
        this.gameObject.rotateY(this.context.time.deltaTime*this.speed);
    }
}