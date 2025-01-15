/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

import { COLORS } from '../helpers/colors.ts';

class Projector {
  turnOn() {
    console.log('Proyector encendido');
  }

  turnOff() {
    console.log('Proyector apagado');
  }
}

class SoundSystem {
  on() {
    console.log('Sistema de sonido encendido');
  }

  off() {
    console.log('Sistema de sonido apagado');
  }
}

class VideoPlayer {
  on() {
    console.log('Video player encendido');
  }

  play(movie: string) {
    console.log(`Reproduciendo %c${movie}`, COLORS.cyan);
  }

  stop() {
    console.log('Pelicula detenida');
  }

  off() {
    console.log('Video player apagado');
  }
}

class PopcornMaker {
  poppingPopcorn() {
    console.log('Haciendo palomitas');
  }

  turnOffPoppingPopcorn() {
    console.log('Deteniendo popcorn');
  }
}

interface HomeTheaterFacadeOptions {
  projector: Projector;
  soundSystem: SoundSystem;
  videoPlayer: VideoPlayer;
  popcornMaker: PopcornMaker;
}

class HomeTheaterFacade {
  private projector: Projector;
  private soundSystem: SoundSystem;
  private videoPlayer: VideoPlayer;
  private popcornMaker: PopcornMaker;

  constructor({
    projector,
    soundSystem,
    videoPlayer,
    popcornMaker,
  }: HomeTheaterFacadeOptions) {
    this.projector = projector;
    this.soundSystem = soundSystem;
    this.videoPlayer = videoPlayer;
    this.popcornMaker = popcornMaker;
  }

  watchMovie(movie: string): void {
    console.log('%cPreparando para ver la película', COLORS.green);
    this.projector.turnOn();
    this.soundSystem.on();
    this.popcornMaker.poppingPopcorn();
    this.videoPlayer.on();
    this.videoPlayer.play(movie);

    console.log('%cDisfrute la película', COLORS.blue);
  }

  stopWatchingMovie(): void {
    console.log('%cPreparando para detener la película', COLORS.red);
    this.popcornMaker.turnOffPoppingPopcorn();
    this.soundSystem.off();
    this.videoPlayer.stop();
    this.videoPlayer.off();
    this.projector.turnOff();
  }
}

function main() {
  const homeTheater = new HomeTheaterFacade({
    projector: new Projector(),
    soundSystem: new SoundSystem(),
    videoPlayer: new VideoPlayer(),
    popcornMaker: new PopcornMaker(),
  });

  homeTheater.watchMovie('Spiderman Far From Home');
  homeTheater.stopWatchingMovie();
}

main();