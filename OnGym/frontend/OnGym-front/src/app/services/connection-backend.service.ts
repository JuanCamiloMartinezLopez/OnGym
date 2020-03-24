import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from "@angular/router";
import { athlete } from "../models/athlete";
import { trainer } from "../models/trainer";
import { user } from "../models/user";
//import { routin } from "../models/routin";
//import { exercise } from "../models/exercise";

@Injectable({
  providedIn: 'root'
})
export class ConnectionBackendService {
  type;
  private url='http://localhost:4000/OnGym-api';

  constructor(private http:HttpClient, private router:Router) { }

  logIn(user:user){
    this.type=user.type;
    return this.http.post<any>(this.url+'/login',user);
  }

  RegistroEntrenador(entrenador:trainer){
    this.type="trainer";
    return this.http.post<any>(this.url+'/singUpTrainer',entrenador);
  }

  RegistroDeportista(deportista:athlete){
    this.type="athlete";
    return this.http.post<any>(this.url+'/singUpAthlete',deportista);
  }

  getDeportistas(){
    return this.http.get(this.url+'/getAthletes',{});
  }

  getType(){
    return this.type;
  }

  LoggedIn(){
    if(localStorage.getItem('token')){
      return true;
    }else{
      return false;
    }
  }

  LoggedOut(){
    this.type="";
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    
  }

  getToken(){
    return localStorage.getItem('token');
  }

}
