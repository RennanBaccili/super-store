import { Category } from "./Category";

export class Product {
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: Category;
    imageUrl: string;
    constructor(name: string, description: string, price: number, quantity: number, category: Category, imageUrl: string) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.category = category;
        this.imageUrl = imageUrl;
    }
}