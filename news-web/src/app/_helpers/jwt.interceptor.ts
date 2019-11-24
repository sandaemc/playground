import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // FIXME: Hard-coded token for demo-purpose only
    // In real-world, we will create a login page and save the token returned from the server in-memory
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1Nzk3OTE2Mzl9.Kdsp_ihSv_uMiHPmVSsBs78M22MRR8ELqcOVjNAiCe8`
      }
    });

    return next.handle(request);
  }
}
