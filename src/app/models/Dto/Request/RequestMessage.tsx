import { Message } from "../../message";
import { Product } from "../../Product";
import { TypeUser } from "../../typeuser.enum";



export class RequestMessage implements Message {
    content: string;

    TypeUser: TypeUser;

    Products:Product[];

    constructor(content: string, TypeUser: TypeUser, Products: Product[]) {
        this.content = content;
        this.TypeUser = TypeUser; 
        this.Products = Products;
    }
}