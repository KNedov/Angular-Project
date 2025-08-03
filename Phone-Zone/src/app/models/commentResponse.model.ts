import { Comment } from './comment.model';
import { Likes } from './likes.model';

export interface CommentsResponse {
  success: boolean;
  count: number;
  data: [
    {
      likes: Likes[];
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
