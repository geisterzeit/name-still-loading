using UnityEngine;
//TMP Skript

public class TMPcameraFollowPlayer : MonoBehaviour
{
    public Transform player;

    // Update is called once per frame
    void LateUpdate()
    {
        this.transform.position = new Vector3(player.position.x, this.transform.position.y, player.position.z-3.5f);
        //this.transform.Translate(new Vector3(player.position.x,0f,player.position.z-3.5f));
    }
}
