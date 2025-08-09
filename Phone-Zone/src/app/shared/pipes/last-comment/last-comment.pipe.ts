import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from '../../../models'; // Adjust path as needed

@Pipe({
  name: 'lastComment'
})
export class LastCommentPipe implements PipeTransform {
  transform(comments: Comment[]): Comment | null {
    if (!comments || !Array.isArray(comments) || comments.length === 0) {
      return null;
    }
    return comments[comments.length - 1];
  }
}
