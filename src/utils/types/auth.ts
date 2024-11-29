import { ObjectId } from "mongodb";
export interface UserRouteResponse {
  type: string;
  user: {
    _id: ObjectId;
    username: string;
    email: string;
    activeorder: ObjectId[];
  };
  session: {
    _id: ObjectId;
    user: string;
    created: number;
    expire: number;
  };
}


export interface User {
  _id: ObjectId;
  username: string;
  email: string;
  activeorder: ObjectId[];
}

export interface UserSanitized {
  _id: string;
  username: string;
  email: string;
  activeorder: string[];
}

export interface Session {
  _id: ObjectId;
  user: string;
  created: number;
  expire: number;
};

export interface SessionSanitized {
  _id: string;
  user: string;
  created: number;
  expire: number;
}
