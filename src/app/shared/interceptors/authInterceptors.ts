
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalVariables } from '../utilities/constants';
export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable()
export class AutherizationInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has(InterceptorSkipHeader)) {
      //console.log('if block')
      const headers = req.headers.delete(InterceptorSkipHeader);
      return next.handle(req.clone({ headers }));
    } else {
      //console.log('else block ' + localStorage.getItem(GlobalVariables.AUTHERIZATION_TOEKN));
      const modified = req.clone({
        setHeaders:
        {
          'Authorization': localStorage.getItem(GlobalVariables.AUTHERIZATION_TOEKN),
          'Content-Type': 'application/json'
        }
      });
      return next.handle(modified);
    }
  }
}
