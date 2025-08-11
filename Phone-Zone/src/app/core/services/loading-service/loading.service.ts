import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingCount = signal(0);

  startLoading() {
    this.loadingCount.update((v) => v + 1);
  }

  stopLoading() {
    this.loadingCount.update((v) => Math.max(0, v - 1));
  }

  get isLoading() {
    return this.loadingCount() > 0;
  }
}
