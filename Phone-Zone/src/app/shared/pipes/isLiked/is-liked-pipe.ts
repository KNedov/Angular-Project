import { inject, Pipe, PipeTransform } from '@angular/core';
import { Comment } from '../../../models';
import { AuthService } from '../../../core/services';

@Pipe({
  name: 'isLiked',
})
export class IsLikedPipe implements PipeTransform {
  authService = inject(AuthService);
  userId = this.authService.getCurrentUserId();
  transform(comment: Comment): boolean {
    if (!this.userId || !comment.likes) return false;
    return comment.likes.some((like) => like._id === this.userId);
  }
}
