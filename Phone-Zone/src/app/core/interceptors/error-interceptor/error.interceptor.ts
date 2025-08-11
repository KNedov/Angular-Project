import {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { ErrorService, LoadingService } from '../../services';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);
  const loadingService = inject(LoadingService);

  loadingService.startLoading(); 

  return next(req).pipe(
    tap(() => errorService.clearError()), 
    catchError((error: HttpErrorResponse) => {
      const errorMessage = error.error?.message || error.message;
      errorService.setError(errorMessage);
      return throwError(() => error); 
    }),
    finalize(() => loadingService.stopLoading())
  );
};
