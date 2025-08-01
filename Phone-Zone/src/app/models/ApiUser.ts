import { Phone, Comment } from '.';

export interface ApiUser {
  
  tel: string;
  email: string;
  username: string;
  password: string;
  cart: string[]; // Array of phone IDs
  phones: Phone[]; // Array of phone IDs
  comments: Comment[];
}
