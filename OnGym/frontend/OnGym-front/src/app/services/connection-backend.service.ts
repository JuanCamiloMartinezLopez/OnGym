import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ConnectionBackendService {
  private url='http://localhost:4000/OnGym-api';

  constructor(private http:HttpClient, private router:Router) { }

  logIn(user){
    return this.http.post<any>(this.url+'/login',user);
  }

  RegistroEntrenador(entrenador){
    return this.http.post<any>(this.url+'/registroEntrenador',entrenador);
  }

  RegistroDeportista(deportista){
    return this.http.post<any>(this.url+'/registroDeportista',deportista);
  }

  LoggedIn(){
    if(localStorage.getItem('token')){
      return true;
    }else{
      return false;
    }
  }

  LoggedOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    
  }

  getToken(){
    return localStorage.getItem('token');
  }

}
