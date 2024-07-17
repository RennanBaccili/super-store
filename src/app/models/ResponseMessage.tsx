import { Message } from "./message";
import { Product } from "./Product";
import { TypeUser } from "./typeuser.enum";

export class ResponseMessage implements Message{

    Id: number;

    Answer: string;

    TypeUser: TypeUser;

    Products:Product[];

    constructor(Id?: number, Answer?: string, TypeUser?: TypeUser, Products?: Product[]) {
        this.Id = Id ?? 123; 
        this.Answer = Answer ?? '';
        this.TypeUser = TypeUser ?? 1; 
        this.Products = Products ?? [];
    }
}