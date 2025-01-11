/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */

import { COLORS } from '../helpers/colors.ts';

interface Ability {
  use(): void;
}

class SwordAttack implements Ability {
  use(): void {
    console.log('Atacar con una %cespada ferozmente', COLORS.blue);
  }
}

class MagicSpellAttack implements Ability {
  use(): void {
    console.log('Lanza un hechizo %cmagico poderoso', COLORS.green);
  }
}

abstract class Character {
  protected ability: Ability;

  constructor(ability: Ability) {
    this.ability = ability;
  }

  setAbility(ability: Ability): void {
    this.ability = ability;
  }

  abstract perfomAbility(): void;
}

class Warrior extends Character {
  override perfomAbility(): void {
    console.log('El guerrero esta listo para lucar');
    this.ability.use();
  }
}

class Mage extends Character {
  override perfomAbility(): void {
    console.log('El mago prepara su magia');
    this.ability.use();
  }
}

class AxeAttack implements Ability {
    use(): void {
      console.log('Golpea con el %chacha salvajemente', COLORS.brown)
    }
}

class FireBallSpell implements Ability {
    use(): void {
      console.log('Lanza una gran %cBola de fuego', COLORS.red);
    }
}

function main() {
    const warrior = new Warrior(new SwordAttack());
    warrior.perfomAbility();

    warrior.setAbility(new AxeAttack());
    warrior.perfomAbility();

    const mage = new Mage(new MagicSpellAttack());
    mage.perfomAbility();

    mage.setAbility(new FireBallSpell());
    mage.perfomAbility();
}

main();
