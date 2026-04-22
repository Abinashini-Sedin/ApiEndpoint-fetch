import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { LoadingService } from "../service/loading-service";
import { finalize } from "rxjs/internal/operators/finalize";
import { throwError } from "rxjs/internal/observable/throwError";
import { catchError } from "rxjs/internal/operators/catchError";

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
    const loader =inject(LoadingService);
    loader.show();
    return next(req).pipe(
        catchError((error) => {
            alert(error.message||"Something went wrong");
            return throwError(()=>error);
        }),
         finalize(()=>loader.hide())
        );
}

        
    