using System.Collections;
using UnityEngine;

public class EnemyWaves : MonoBehaviour
{
    public GameObject EnemyPrefab;
    public Transform FirstWayPoint;

    [SerializeField]
    private int currentWave = 1;

    private void Start()
    {
        Time.timeScale = 1f;
        StartCoroutine(SpawnEnemies());
    }

    private IEnumerator SpawnEnemies()
    {
        int enemyCount = (currentWave == 1) ? 5 : (currentWave == 2) ? 7 : (currentWave == 3) ? 10 : 15;

        for (int i = 0; i < enemyCount; i++)
        {
            Instantiate(EnemyPrefab, FirstWayPoint.position, Quaternion.identity);
            yield return new WaitForSeconds(1f);
        }
    }
}
