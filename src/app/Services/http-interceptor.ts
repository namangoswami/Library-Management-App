import { Injectable, Output } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError, Observable, retry, tap, throwError } from 'rxjs';
import { GlobalStoreService } from './global-store.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor(
    private store: GlobalStoreService,
    private snackbar: MatSnackBar
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let reqWithHeaders = req.clone({
      setHeaders: { Authorization: 'bearer ' + this.store.getToken() },
    });
    return next
      .handle(reqWithHeaders)
      .pipe()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // alert(error.error);
          // console.log('Intercepted Error: ', error);
          console.log(error);
          this.snackbar.open(error.error.message, 'Okay', { duration: 2000 });
          return throwError(error);
        }),
        tap({
          next: (event: any) => {
            if (event.body) console.log(event);
            const message = event?.body?.message;
            if (message)
              this.snackbar.open(message, 'Okay', { duration: 2000 });
          },
        })
      );
  }
}
