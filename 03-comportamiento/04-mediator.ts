/**
 * ! Patrón mediator
 * Es un patrón de diseño de comportamiento que ayuda a reducir
 * las dependencias desordenadas entre objetos.
 * Este patrón limita la comunicación directa entre ellos,
 * haciendo que solo interactúen a través de un objeto mediador.
 *
 * * Es útil reducir la complejidad de las relaciones entre objetos
 *
 * https://refactoring.guru/es/design-patterns/mediator
 */

import { COLORS } from '../helpers/colors.ts';

// Chatroom

class ChatRoom {
  private users: User[] = [];
  public title: string;

  constructor(title: string) {
    this.title = title;
  }

  addUser(user: User) {
    this.users.push(user);
  }

  sendMessage(sender: User, message: string) {
    const usersToSend = this.users.filter((user) => user !== sender);
    for (const user of usersToSend) {
      user.receiveMessage(sender, message);
    }
  }
}

class User {
  private username: string;
  private chatRoom: ChatRoom;

  constructor(username: string, chatRoom: ChatRoom) {
    this.username = username;
    this.chatRoom = chatRoom;
    chatRoom.addUser(this);
  }

  sendMessage(message: string) {
    console.log(
      `\n%c${this.username} envia: %c${message}`,
      COLORS.blue,
      COLORS.white
    );
    this.chatRoom.sendMessage(this, message);
  }

  receiveMessage(sender: User, message: string) {
    console.log(
      `%c${this.username} recibe de ${sender.username}: %c${message}`,
      COLORS.blue,
      COLORS.white
    );
  }
}

function main() {
  const chatRoom = new ChatRoom('Sala');

  const user1 = new User('Victor', chatRoom);
  const user2 = new User('Daniela', chatRoom);
  const user3 = new User('Kevin', chatRoom);
  const user4 = new User('José', chatRoom);

  user1.sendMessage('Hola a todos');
  user2.sendMessage('Hola, como están?');
  user3.sendMessage('Excelente :D');
  user4.sendMessage('8)');
}

main();
