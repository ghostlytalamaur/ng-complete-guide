import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export class LoggingInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`New request to ${req.url}`);
    console.log('Headers:', req.headers);
    return next.handle(req)
      .pipe(
        tap(event => {
          console.log(`New event when requesting to ${req.url}\n${event.type}`);
        })
      );
  }
}
