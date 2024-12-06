using UnityEngine;

/*
 * Wird den Gegner-Prefabs hinzugefügt
 * Managt das Bewegen + Rotieren von einem Waypoint zum nächsten
 * Werden bei erstem Waypoint initiiert und beim letzten gelöscht
 */

public class EnemyMovement : MonoBehaviour
{
    public float speed = 2f;
    public float rotationSpeed = 0.1f;

    private Transform target;
    private int wavePointIndex = 0;

    private void Start()
    {
        target = Waypoints.points[0];
    }

    private void Update()
    {
        Vector3 dir = target.position - transform.position;
        transform.Translate(dir.normalized * speed * Time.deltaTime, Space.World);
        RotateTowardsWaypoint();

        if(Vector3.Distance(transform.position, target.position) <= 0.4f)
        {
            GetNextWavepoint();
        }
    }

    private void GetNextWavepoint()
    {
        if (wavePointIndex >= Waypoints.points.Length-1)
        {
            Destroy(gameObject);
            return;
        }
        wavePointIndex++;
        target = Waypoints.points[wavePointIndex];
    }

    private void RotateTowardsWaypoint()
    {
        Vector3 direction = target.position - transform.position;
        Quaternion targetRotation = Quaternion.LookRotation(direction);
        transform.rotation = Quaternion.Lerp(transform.rotation, targetRotation, rotationSpeed);
    }

}
