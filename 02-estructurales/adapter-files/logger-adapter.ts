import { Logger } from 'jsr:@deno-library/logger';

// TODO: Implementar el LoggerAdapter

interface ILoggerAdapter {
  file: string;
  writeLog(message: string): void;
  writeWarning(message: string): void;
  writeError(message: string): void;
}

export class DenoLoggerAdapter implements ILoggerAdapter {
  public readonly file: string;
  private logger = new Logger();

  constructor(file: string) {
    this.file = file;
  }

  writeLog(message: string): void {
    this.logger.info(`[${this.file} Log] ${message}`)
  }

  writeWarning(message: string): void {
    this.logger.warn(`[${this.file} Warning] ${message}`)
  }

  writeError(message: string): void {
    this.logger.error(`[${this.file} Error] ${message}`)
  }
}
