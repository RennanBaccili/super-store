import { TypeUser } from "./typeuser.enum";

export class Message {
  Answer: string;
  TypeUser: TypeUser;
  
  constructor(Answer: string, TypeUser: TypeUser) {
    this.Answer = Answer;
    this.TypeUser = TypeUser;
  }
}