/**
 * ! Patron Chain of Responsibility
 * Es un patrón de diseño de comportamiento que te permite pasar solicitudes
 * a lo largo de una cadena de manejadores.
 *
 * * Es útil cuando se necesita procesar datos de diferentes maneras, pero no
 * * se sabe de antemano qué tipo de procesamiento se necesita o en qué orden
 * * pero se sabe que se necesita procesar en una secuencia.
 *
 * https://refactoring.guru/es/design-patterns/chain-of-responsibility
 */

import { COLORS } from '../helpers/colors.ts';

interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): void;
}

abstract class BaseHandler implements Handler {
  private nextHandler?: Handler;

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  handle(request: string): void {
    if (this.nextHandler) this.nextHandler.handle(request);
  }
}

class BasicSupport extends BaseHandler {
  override handle(request: string): void {
    if (request === 'básico') {
      console.log('%cSoporte básico: Resolviendo problema básico', COLORS.green);
      return;
    }

    console.log('%cSoporte básico: Pasando el problema al soporte avanzado', COLORS.orange);
    super.handle(request);
  }
}

class AdvancedSupport extends BaseHandler {
  override handle(request: string): void {
    if (request === 'avanzado') {
      console.log(
        'Soporte avanzado: %cResolviendo problema avanzado',
        COLORS.yellow
      );
      return;
    }

    console.log('%cSoporte avanzado: Pasando el problema al soporte experto', COLORS.purple);
    super.handle(request);
  }
}

class ExpertSupport extends BaseHandler {
  override handle(request: string): void {
    if (request === 'experto') {
      console.log('%cSoporte experto: Resolviendo problema experto', COLORS.cyan);
      return;
    }

    console.log('%cSoporte experto: No hay nada que hacer... Bye bye', COLORS.red);
  }
}


function main() {
    const basicSupport = new BasicSupport();
    const advancedSuport = new AdvancedSupport();
    const expertSupport = new ExpertSupport();

    basicSupport.setNext(advancedSuport).setNext(expertSupport);

    basicSupport.handle('experto');
}

main();