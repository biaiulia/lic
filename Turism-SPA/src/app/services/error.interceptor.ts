import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    // interceptam requestul si catch la erori
    req: import('@angular/common/http').HttpRequest<any>,
    next: import('@angular/common/http').HttpHandler
  ): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
    // throw new Error('Method not implemented.');
    /*return next.handle(req).pipe(
        catchError(error => {
        if (error.status == 401){
            return throwError(error.statusText);
        }
        if (error instanceof HttpErrorResponse){
            const applicationError = error.headers.get('Application-Error');
        }
    }))
  }????????????????????????????????????????*/
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 401) {
          return throwError(error.statusText);
        }
        if (error instanceof HttpErrorResponse) {
          const applicationError = error.headers.get('Application-Error');
          if(applicationError){
              return throwError(applicationError);
          }
          const serverError = error.error;
          let modalStateErrors = '';
          if(serverError.errors && typeof serverError.errors === 'object'){
              for (const key in serverError.errors){
                  if(serverError.errors[key]) {
                      modalStateErrors += serverError.errors[key] + '\n';
                  } // obj bracket notation
              }
          }
          return throwError(modalStateErrors || serverError || 'Server error'); // dac aprimim server error nu am handleuit toate cazurile
        }
      })
    );
  }
}
export const ErrorInterceptorProvidor = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
