import { Comment, User } from '.';


export interface Phone {
  _id: string;
  phoneName: string;
  displaySize: string;
  color: string;
  cpu:string;
  ram:string;
  storage:string;
  price: number;
  image: string;
  userId: User; // User ID of the phone owner
  comments: Comment[]; // Array of comments associated with the phone
  created_at: Date; // Creation date of the phone entry
}


