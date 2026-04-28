import { HttpInterceptorFn } from "@angular/common/http";

export const httpInterceptor: HttpInterceptorFn = (req, next) => {

    const cloneReq =req.clone({
      headers: req.headers.append('X-Authentication', 'brear Vairam'),
    })

    return next(cloneReq);
}