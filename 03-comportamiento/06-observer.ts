/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */

import { COLORS } from '../helpers/colors.ts';

interface Observer {
  notify(videoTitle: string): void;
}

class YoutubeChannel {
  private subscribers: Observer[] = [];
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  subscribe(observer: Observer) {
    this.subscribers.push(observer);
    console.log(`Nuevo suscriptor al canal %c${this.name}`, COLORS.green);
  }

  unsubscribe(observer: Observer) {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber !== observer
    );
    console.log(
      `Un suscriptor se ha dado de baja %c"${this.name}"`,
      COLORS.red
    );
  }

  uploadVideo(videoTitle: string) {
    console.log(
      `Canal ${this.name} ha subido un nuevo video %c${videoTitle}`,
      COLORS.green
    );

    for (const subscriber of this.subscribers) subscriber.notify(videoTitle);
  }
}

class Subscriber implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  notify(videoTitle: string): void {
    console.log(
      `${this.name} ha sido notificado: %cNuevo video ${videoTitle}`,
      COLORS.blue
    );
  }
}

function main() {
  const channel = new YoutubeChannel('Jueguitos');
  const melissa = new Subscriber('Melissa');
  const cesar = new Subscriber('César');
  const emin = new Subscriber('Emin');

  channel.subscribe(melissa);
  channel.subscribe(cesar);

  channel.uploadVideo('Hell Let Loose');

  channel.subscribe(emin);

  channel.uploadVideo('Delta Force');

  channel.unsubscribe(cesar);

  channel.uploadVideo('Balatro');
}

main();
