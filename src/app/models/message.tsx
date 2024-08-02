import { TypeUser } from "./typeuser.enum";

export class Message {
  content: string;
  TypeUser: TypeUser;
  
  constructor(content: string, TypeUser: TypeUser) {
    this.content = content;
    this.TypeUser = TypeUser;
  }
}