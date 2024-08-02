import { api } from "../config";
import { MessageDTO } from "../models/Dto/MessageDTO";
import { RequestMessageDTO } from "../models/Dto/Request/RequestSaveMessage";
import { ResponseMessage } from "../models/Response/ResponseMessage";

export async function sendChatMessage(message: MessageDTO): Promise<ResponseMessage>  {
    try {
      const response = await api.post(`/message`, message);
      return response.data;
    } catch (error) {
      console.error('Houve um problema ao enviar a mensagem:', error);
      throw error;
    }
}

export async function sendSaveChatMessage(requestMessageDTO :RequestMessageDTO): Promise<ResponseMessage>  {
  try {
    console.log(requestMessageDTO);
    const response = await api.post(`/message/MessageSave`, requestMessageDTO);
    return response.data;
  } catch (error) {
    console.error('Houve um problema ao enviar a mensagem:', error);
    throw error;
  }
}
