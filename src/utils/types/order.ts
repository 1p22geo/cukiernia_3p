import { Product, ProductSanitized } from "./product";
import { ObjectId } from "mongodb";

export interface Order {
  _id: ObjectId
  adress: string;
  port: string;
  products: Product[];
  user: string
}

export interface OrderSanitized {
  _id: string
  adress: string;
  port: string;
  products: ProductSanitized[]
  user: string;
}
