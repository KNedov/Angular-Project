import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  private errorSignal = signal<string | null>(null);
  private timeoutId: any;

  setError(message: string) {
    this.clearError();
    this.errorSignal.set(message);
    this.timeoutId = setTimeout(() => this.clearError(), 5000);
  }

  clearError() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.errorSignal.set(null);
  }

  get error() {
    return this.errorSignal.asReadonly();
  }
}
