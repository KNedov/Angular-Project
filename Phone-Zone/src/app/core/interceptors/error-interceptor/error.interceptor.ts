import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, of } from 'rxjs';
import { ErrorService, LoadingService } from '../../services';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);
  const loadingService = inject(LoadingService);

  loadingService.setLoading(true);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorMessage = error.error?.message || error.message;
      errorService.setError(errorMessage);
      
      // Връщаме празен HttpResponse вместо null
      return of(new HttpResponse({
        status: 200,
        body: null
      }));
    }),
    finalize(() => loadingService.setLoading(false))
  );
};