
import { Message } from "../message";
import { Product } from "../Product";
import { TypeUser } from "../typeuser.enum";


export class ResponseMessage implements Message{

    Id: number;

    content: string;

    TypeUser: TypeUser;

    Products:Product[];

    constructor(Id: number, content: string, TypeUser: TypeUser, Products: Product[]) {
        this.Id = Id;
        this.content = content;
        this.TypeUser = TypeUser; 
        this.Products = Products;
    }
}