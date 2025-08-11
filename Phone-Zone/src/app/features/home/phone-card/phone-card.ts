import { Component, inject, Input, Signal } from '@angular/core';
import { Phone } from '../../../models';
import { MatIconModule } from '@angular/material/icon';
import { ButtonDetails } from "../../../shared/components/button-details/button-details";
import { LastCommentPipe } from '../../../shared/pipes/last-comment/last-comment.pipe';
import { AuthService } from '../../../core/services';

@Component({
  selector: 'app-phone-card',
  imports: [MatIconModule, ButtonDetails,LastCommentPipe],
  templateUrl: './phone-card.html',
  styleUrl: './phone-card.css'
})
export class PhoneCard {
  authService=inject(AuthService)
@Input()phone!:Phone
readonly isLoggedIn$: Signal<boolean> = this.authService.isLoggedIn$;
  
}
