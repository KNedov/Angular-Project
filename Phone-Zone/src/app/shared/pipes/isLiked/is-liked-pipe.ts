import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from '../../../models';

@Pipe({
  name: 'isLiked',
})
export class IsLikedPipe implements PipeTransform {
  transform(comment: Comment, userId: string | null): boolean {
    if (!userId || !comment.likes) return false;

    return comment.likes.some((like) => like._id === userId);
  }
}
