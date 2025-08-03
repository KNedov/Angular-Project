import { Phone, Comment } from '.';

export interface ApiUser {
  _id: string;
  tel: string;
  email: string;
  username: string;
  password: string;
  userId: string;
  cart: string[]; // Array of phone IDs
  phones: Phone[]; // Array of phone IDs
  comments: Comment[];
}
