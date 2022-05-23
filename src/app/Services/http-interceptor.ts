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
import { Router } from '@angular/router';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor(
    private store: GlobalStoreService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let reqWithHeaders = req.clone({
      setHeaders: { Authorization: 'bearer ' + this.store.getToken() },
    });
    console.log('request recieved', reqWithHeaders);
    this.store.updateLoading(1);
    return next
      .handle(reqWithHeaders)
      .pipe()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // alert(error.error);
          // console.log('Intercepted Error: ', error);
          console.log('in tap', reqWithHeaders);
          this.store.updateLoading(-1);
          console.log(error);
          if (error.status == 401) {
            this.router.navigateByUrl('/login');
            this.store.logOut();
          }
          if (error.error.message)
            this.snackbar.open(error.error.message, 'Okay', { duration: 2000 });
          else
            this.snackbar.open('Internal Server Error', 'Okay', {
              duration: 2000,
            });
          return throwError(error);
        }),
        tap({
          next: (event: any) => {
            if (event.body) console.log(event);
            const message = event?.body?.message;
            if (message)
              this.snackbar.open(message, 'Okay', { duration: 2000 });
          },
          finalize: () => {
            this.store.updateLoading(-1);
            console.log('in tap', reqWithHeaders);
          },
        })
      );
  }
}
