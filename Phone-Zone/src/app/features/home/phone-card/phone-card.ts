import { Component, Input } from '@angular/core';
import { Comment, Phone } from '../../../models';
import { MatIconModule } from '@angular/material/icon';
import { ButtonDetails } from "../../../shared/components/button-details/button-details";
import { LastCommentPipe } from '../../../shared/pipes/last-comment/last-comment.pipe';


@Component({
  selector: 'app-phone-card',
  imports: [MatIconModule, ButtonDetails,LastCommentPipe],
  templateUrl: './phone-card.html',
  styleUrl: './phone-card.css'
})
export class PhoneCard {
@Input()phone!:Phone
}
