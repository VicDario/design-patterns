/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 */

import { COLORS } from '../helpers/colors.ts';
import { sleep } from "../helpers/sleep.ts";

/**
 * * Objetivo: Implementar el patrón State para simular el funcionamiento
 * * de una máquina expendedora.
 * * La máquina tiene diferentes estados,
 *  * Como Esperando Dinero,
 *  * Seleccionando Producto,
 *  * Entregando Producto,
 * * y su comportamiento varía dependiendo del estado actual.
 */

interface State {
  name: string;
  insertMoney(): void;
  selectProduct(): void;
  dispenseProduct(): void;
}

class VendingMachine {
  private state: State;

  constructor() {
    this.state = new WaitingForMoney(this);
  }

  insertMoney() {
    this.state.insertMoney();
  }

  selectProduct() {
    this.state.selectProduct();
  }

  dispenseProduct() {
    this.state.dispenseProduct();
  }

  setState(state: State) {
    this.state = state;
    console.log(`Estado cambio a: %c${state.name}`, COLORS.yellow);
  }

  getStateName(): string {
    return this.state.name;
  }
}

class WaitingForMoney implements State {
  public name: string = 'Esperando dinero';
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log(
      'Dinero insertado: %cAhora puedes selecionar un producto',
      COLORS.green
    );
    this.vendingMachine.setState(new SelectingProduct(this.vendingMachine));
  }

  selectProduct(): void {
    console.log('%cPrimero debes insertar dinero', COLORS.red);
  }

  dispenseProduct(): void {
    console.log('%cPrimero debes insertar dinero', COLORS.red);
  }
}

class SelectingProduct implements State {
  public name: string = 'Seleccionando producto';
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log(
      '%cPor favor selecciona producto - dinero ya insertado',
      COLORS.red
    );
  }

  selectProduct(): void {
    this.vendingMachine.setState(new DispensingProduct(this.vendingMachine));
  }

  dispenseProduct(): void {
    console.log(
      '%cPor favor seleccione producto antes de despacharlo',
      COLORS.red
    );
  }
}

class DispensingProduct implements State {
  public name: string = 'Despachando producto';
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log('%cPor favor espera a que se entregue el producto', COLORS.red);
  }

  selectProduct(): void {
    console.log('%cProducto ya seleccionado y despachando', COLORS.red);
  }

  dispenseProduct(): void {
    console.log(
      '%cProducto despachado. Cambiando estado a EsperandoDinero',
      COLORS.red
    );
    this.vendingMachine.setState(new WaitingForMoney(this.vendingMachine));
  }
}

async function main() {
  const vendingMachine = new VendingMachine();

  let selectedOption: string | null = '4';

  do {
    console.clear();
    console.log(
      `Selecciona una opción: %c${vendingMachine.getStateName()}`,
      COLORS.blue
    );

    selectedOption = prompt(`
        1. Insertar dinero
        2. Seleccionar producto
        3. Dispensar producto
        4. Salir
        opcion: `);

    switch (selectedOption) {
      case '1':
        vendingMachine.insertMoney();
        break;
      case '2':
        vendingMachine.selectProduct();
        break;
      case '3':
        vendingMachine.dispenseProduct();
        break;
      default:
        console.log('Opcion no valida');
    }

    await sleep(3000);
  } while (selectedOption !== '4');
}

main();
