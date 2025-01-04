/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

import { COLORS } from '../helpers/colors.ts';

class CodeEditorState {
  readonly content: string;
  readonly cursorPosition: number;
  readonly unsaveChanges: boolean;

  constructor(
    content: string,
    cursorPosition: number,
    unsavedChanges: boolean
  ) {
    this.content = content;
    this.cursorPosition = cursorPosition;
    this.unsaveChanges = unsavedChanges;
  }

  displayState(): void {
    console.log(`\n%cEstado del editor`, COLORS.green);
    console.log(`
        Contenido: ${this.content}
        Posicion Cursor: ${this.cursorPosition}
        Cambios sin guardar: ${this.unsaveChanges}
        `);
  }

  copyWith({
    content,
    cursorPosition,
    unsaveChanges,
  }: Partial<CodeEditorState>): CodeEditorState {
    return new CodeEditorState(
      content ?? this.content,
      cursorPosition ?? this.cursorPosition,
      unsaveChanges ?? this.unsaveChanges
    );
  }
}

class CodeEditorHistory {
  private history: CodeEditorState[] = [];
  private currentIndex: number = -1;

  save(state: CodeEditorState) {
    if (this.currentIndex < this.history.length - 1)
      this.history = this.history.splice(0, this.currentIndex + 1);

    this.history.push(state);
    this.currentIndex++;
  }

  undo(): CodeEditorState | null {
    if (this.currentIndex === 0) return null;

    this.currentIndex--;
    return this.history[this.currentIndex];
  }

  redo(): CodeEditorState | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }
    return null;
  }
}

function main() {
  const history = new CodeEditorHistory();
  let editorState = new CodeEditorState("console.log('Hola Mundo');", 2, false);

  history.save(editorState);

  console.log('%cEstado Inicial', COLORS.blue);
  editorState.displayState();
  
  editorState = editorState.copyWith({
    content: "console.log('Nueva linea');",
    cursorPosition: 3,
    unsaveChanges: true,
  });
  history.save(editorState);

  console.log('%cDespues del primer cambio', COLORS.blue);
  editorState.displayState();

  editorState = editorState.copyWith({
    cursorPosition: 5,
  });
  history.save(editorState);

  console.log('%cDespues de mover el curso', COLORS.blue);
  editorState.displayState();

  console.log('\n%cDespues del undo', COLORS.blue);
  editorState = history.undo()!;
  editorState.displayState();

  console.log('\n%cDespues del redo', COLORS.blue);
  editorState = history.redo()!;
  editorState.displayState();
}

main();
