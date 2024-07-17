import { BASE_URL } from "../config";
import { MessageDTO } from "../models/Dto/MessageDTO";
import { ResponseMessage } from "../models/ResponseMessage";

export async function sendChatMessage(message: MessageDTO): Promise<ResponseMessage>  {
    try {
      const response = await fetch(`${BASE_URL}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(message), 
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Houve um problema ao enviar a mensagem:', error);
      throw error;
    }
}
  
