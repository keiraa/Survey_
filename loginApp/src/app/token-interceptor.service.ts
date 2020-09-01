import { Injectable,Injector } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private _inject:Injector) { }
  intercept(req,next){
    let authService = this._inject.get(AuthService) 
    let tokenReq = req.clone({
      setHeaders:{
        Authorization: 'Bearer '+authService.getToken()
      }
    })
    return next.handle(tokenReq)
  }
}
