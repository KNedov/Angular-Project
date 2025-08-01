import { Component, input, Signal } from '@angular/core';

@Component({
  selector: 'app-no-phone-message',
  imports: [],
  templateUrl: './no-phone-message.html',
  styleUrl: './no-phone-message.css'
})
export class NoPhoneMessage {
  isLoggedIn = input<boolean>();
}
