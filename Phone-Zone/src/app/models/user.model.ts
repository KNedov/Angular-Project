import { Phone, Comment } from '.';

export interface User {
  _id: string;
  tel: string;
  email: string;
  username: string;
  password: string;
  cart: string[];
  phones: Phone[];
  comments: Comment[];
}
