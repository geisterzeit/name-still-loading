import { ElementType } from "./ElementType";

function getDamageMultiplier(towerType: ElementType, monsterType: ElementType) {
  // Unsichtbares Monster
  if (monsterType === ElementType.INVISIBLE) {
    // Nur Unsichtbarkeits-Turm trifft
    if (towerType === ElementType.INVISIBLE) {
      return 1;
    }
    return 0;
  }

  // Gleicher Typ
  if (towerType === monsterType) {
    return 1;
  }

  // Effektiv
  if (
    (towerType === ElementType.FIRE && monsterType === ElementType.PLANT) ||
    (towerType === ElementType.PLANT && monsterType === ElementType.WATER) ||
    (towerType === ElementType.WATER && monsterType === ElementType.FIRE)
  ) {
    return 2;
  }

  // Ineffektiv
  return 0.5;
}

export function calculateDamage(
  baseDamage: number,
  towerType: ElementType,
  monsterType: ElementType
) {
  return baseDamage * getDamageMultiplier(towerType, monsterType);
}
