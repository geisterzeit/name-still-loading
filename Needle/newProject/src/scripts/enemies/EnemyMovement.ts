import { Behaviour, GameObject, serializable, syncDestroy, TransformData } from "@needle-tools/engine";
import { Quaternion, Vector3 } from "three";
import { Wegpunkte } from "../Wegpunkte";
import { Life } from "../Life";

export class EnemyMovement extends Behaviour {
  @serializable()
  speed: number = 0.01;
  @serializable()
  rotSpeed: number = 0.1;

  private target: Vector3 = new Vector3(0, 0, 0);
  private wavePointIndex: number = 0;
  private dir: Vector3 = new Vector3(0, 0, 0);

  start(): void {
    this.target = Wegpunkte.points[0];
    this.dir = new Vector3().subVectors(this.target, this.gameObject.position);
  }

  update(): void {
    if (!this.target) return;

    this.gameObject.position.addScaledVector(
      new Vector3()
        .subVectors(this.target, this.gameObject.position)
        .normalize(),
      this.speed * this.context.time.deltaTime
    );
    this.gameObject.lookAt(this.target);

    //if (Math.floor(this.context.time.time) > Math.floor(this.context.time.time - this.context.time.deltaTime)) console.log(this.dir);
    //let targetRot = new Quaternion().setFromUnitVectors(new Vector3(0,0,1), dir.normalize());

    //this.gameObject.translateX(this.context.time.deltaTime);
    if (this.gameObject.position.distanceTo(this.target) <= 0.1) {
      this.getNextWaypoint();
    }
  }

  private getNextWaypoint(): void {
    if (this.wavePointIndex >= Wegpunkte.points.length - 1) {
      Life.loseLife(1);
      syncDestroy(this.gameObject, this.context.connection);
      return;
    }
    this.wavePointIndex++;
    this.target = Wegpunkte.points[this.wavePointIndex];
    this.dir = new Vector3().subVectors(this.target, this.gameObject.position);
  }
}
