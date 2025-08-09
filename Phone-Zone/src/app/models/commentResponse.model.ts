import { Comment } from './comment.model';
import { Likes } from './likes.model';
import { User } from './user.model';

export interface CommentsResponse {
  success: boolean;
  count: number;
  data: [
    {
      likes: User
      _id: string;
      text: string;
      userId: {
        _id: string;
        username: string;
      };
      phoneId: string;
      created_at: string;
      updatedAt?: string;
    }
  ];
}
