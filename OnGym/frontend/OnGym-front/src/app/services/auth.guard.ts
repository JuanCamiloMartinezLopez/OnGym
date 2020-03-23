import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import {ConnectionBackendService} from '../services/connection-backend.service';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:ConnectionBackendService, private router:Router){

  }

  canActivate(){
    if (this.auth.LoggedIn()){
      return true;
    }else{ 
      this.router.navigate(['/']);
      return false;
    }
  }
  
}
