import { ObjectId } from "mongodb";


export interface Product {
  _id: ObjectId;
  name: string;
  description: string;
  category: string;
  supplier: string;
  price: number;
  added: number;
  comments: Comment[];
}

export interface ProductSanitized {
  _id: string;
  name: string;
  description: string;
  category: string;
  supplier: string;
  price: number;
  added: number;
  comments: CommentSanitized[];
}


export interface Comment {
  poster: string;
  posted: number;
  contents: string;
}

export interface CommentSanitized {
  poster: string;
  posted: number;
  contents: string;
}
