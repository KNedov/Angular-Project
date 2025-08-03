import { User } from ".";
import { Likes } from "./likes.model";


export interface Comment {
   likes: Likes[];
  _id: string;
  text: string;
  userId: User;
  phoneId: string;
  created_at: string | Date;
  updatedAt?: string | Date;
}