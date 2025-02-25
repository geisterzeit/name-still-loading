import { Behaviour } from "@needle-tools/engine";
import { Vector3 } from "three";

export class Wegpunkte extends Behaviour
{
    public static points: Vector3[];

    awake(): void
    {
        Wegpunkte.points = new Array(this.gameObject.children.length);
        for (let i = 0; i < this.gameObject.children.length; i++)
        {
            Wegpunkte.points[i] = this.gameObject.children[i].position;
        }
    }
}