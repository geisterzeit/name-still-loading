import { Behaviour, GameObject, serializable } from "@needle-tools/engine";

export class FollowMe extends Behaviour
{
    @serializable(GameObject)
    whatToFollow: GameObject |null = null;

    update(): void {
        if(this.whatToFollow)
            this.gameObject.position.set(this.whatToFollow.position.x, this.whatToFollow.position.y, this.whatToFollow.position.z);
    }
}