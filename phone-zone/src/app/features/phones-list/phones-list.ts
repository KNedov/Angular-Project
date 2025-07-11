import { Component } from '@angular/core';
import { CommentsList } from '../comments-list/comments-list';


@Component({
  selector: 'app-phones-list',
  imports: [CommentsList],
  templateUrl: './phones-list.html',
  styleUrl: './phones-list.css'
})
export class PhonesList {

}
