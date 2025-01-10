import { COLORS } from '../../helpers/colors.ts';

// TODO: Implementar el LocalLogger Class

export class LocalLogger {
    constructor(
        private file: string
    ) {}

    writeLog(message: string): void {
        console.log(`[${this.file} Log] ${message}`);
    }

    writeError(message: string): void {
        console.log(`[${this.file} Error] ${message}`);
    }

    writeWarning(message: string): void {
        console.log(`[${this.file} Warining] ${message}`);
    }
}