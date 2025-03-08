/* eslint-disable */
import { TypeStore } from "@needle-tools/engine"

// Import types
import { Enemy } from "../scripts/enemies/Enemy.js";
import { EnemyManager } from "../scripts/enemies/EnemyManager.js";
import { EnemyMovement } from "../scripts/enemies/EnemyMovement.js";
import { Gold } from "../scripts/Gold.js";
import { Pause } from "../scripts/Pause.js";
import { RotateMe } from "../scripts/RotateMe.js";
import { Spawner } from "../scripts/Spawner.js";
import { Tower } from "../scripts/Tower.js";
import { Wegpunkte } from "../scripts/Wegpunkte.js";

// Register types
TypeStore.add("Enemy", Enemy);
TypeStore.add("EnemyManager", EnemyManager);
TypeStore.add("EnemyMovement", EnemyMovement);
TypeStore.add("Gold", Gold);
TypeStore.add("Pause", Pause);
TypeStore.add("RotateMe", RotateMe);
TypeStore.add("Spawner", Spawner);
TypeStore.add("Tower", Tower);
TypeStore.add("Wegpunkte", Wegpunkte);
