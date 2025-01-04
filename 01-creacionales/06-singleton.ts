/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

class DragonBalls {
  private static instance: DragonBalls;
  private collectedBalls: number;

  private constructor() {
    this.collectedBalls = 0;
    console.log('Las esferas del Dragón han sido creadas');
  }

  public static getInstance(): DragonBalls {
    if (DragonBalls.instance) return DragonBalls.instance;

    DragonBalls.instance = new DragonBalls();
    return DragonBalls.instance;
  }

  collectBall(): void {
    if (this.collectedBalls < 7) {
        this.collectedBalls++;
        console.log('Esfera recolectada. Total de esderas: ' + this.collectedBalls);
        return;
    }
    console.log('Ya se han recolectado las 7 esferas del Dragón! Invoca a Shenlong')
  }

  summonShenlog() {
    if (this.collectedBalls === 7) {
        console.log('Shenlong ha sido invocado, Pide tu deseo!');
        this.collectedBalls = 0;
        return;
    }
    console.log(`Aún faltan ${7 - this.collectedBalls} esferas`);
  }
}

function main() {
    const gokuDragonBalls = DragonBalls.getInstance();

    gokuDragonBalls.collectBall();
    gokuDragonBalls.collectBall();
    gokuDragonBalls.collectBall();

    gokuDragonBalls.summonShenlog();

    const vegetaDragonBalls = DragonBalls.getInstance();

    vegetaDragonBalls.collectBall();
    vegetaDragonBalls.collectBall();
    vegetaDragonBalls.collectBall();
    vegetaDragonBalls.collectBall();

    gokuDragonBalls.summonShenlog();

    vegetaDragonBalls.summonShenlog();
}

main();
