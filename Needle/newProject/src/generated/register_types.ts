/* eslint-disable */
import { TypeStore } from "@needle-tools/engine"

// Import types
import { EnemyMovement } from "../scripts/EnemyMovement.js";
import { RotateMe } from "../scripts/RotateMe.js";
import { Spawner } from "../scripts/Spawner.js";
import { Wegpunkte } from "../scripts/Wegpunkte.js";

// Register types
TypeStore.add("EnemyMovement", EnemyMovement);
TypeStore.add("RotateMe", RotateMe);
TypeStore.add("Spawner", Spawner);
TypeStore.add("Wegpunkte", Wegpunkte);
