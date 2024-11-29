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
  ratings: number[];
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
  ratings: number[];
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
