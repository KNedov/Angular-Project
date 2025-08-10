import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedReq = req.clone({
    withCredentials: true,
    headers: req.headers
      .set('Content-Type', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest')
  });
  return next(modifiedReq);
};