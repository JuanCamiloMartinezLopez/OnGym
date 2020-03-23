import { Injectable } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http'
import { ConnectionBackendService } from "../services/connection-backend.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService  implements HttpInterceptor{

  constructor(private cb:ConnectionBackendService) { }
  
  intercept(req,next){
    const tokenizeReq=req.clone({
      setHeaders:{
        Authorization: `Bearer ${this.cb.getToken()}`
      }
    })
    return next.handle(tokenizeReq);
  }

  
}
