import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer, Header, Loader } from './shared';
import { ErrorService, LoadingService } from './core/services';
import { ErrorNotification } from './shared/components/error-notification/error-notification';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Loader],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'Phone-Zone';
  constructor(
    public loadingService: LoadingService
  ) {}
}
