import { MessageDTO } from "../MessageDTO";

export class RequestMessageDTO {
  userId: string;
  message: MessageDTO;
  chatId: string;

  constructor(userId: string, message: MessageDTO, chatId: string) {
    this.userId = userId;
    this.message = message;
    this.chatId = chatId;
  }
}