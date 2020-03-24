import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from "@angular/router";
import { athlete } from "../models/athlete";
import { trainer } from "../models/trainer";
import { user } from "../models/user";
import { exercise } from '../models/exercise';
import { routine } from "../models/routin";
import {routine_exercises } from '../models/routine_exercises';

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
    this.type="Trainer";
    return this.http.post<any>(this.url+'/singUpTrainer',entrenador);
  }

  RegistroDeportista(deportista:athlete){
    this.type="Athlete";
    return this.http.post<any>(this.url+'/singUpAthlete',deportista);
  }

  getDeportistas(){
    return this.http.get(this.url+'/getAthletes');
  }
  getEjercicios(){
    return this.http.get<exercise[]>(this.url+'/getExercises')
  }

  getMirutina(){
    return this.http.get<routine>(this.url+'/getMyRoutines')
  }
  
  postRutine(rutine:routine){
    return this.http.post(this.url+'/postRutine',rutine);
  }

  getNumberRoutines(){
    return this.http.get<routine[]>(this.url+'/getNumberRoutines')
  }

  getRoutines(){
    return this.http.get<routine_exercises[]>(this.url+'/getRoutines');
  }

  postAthleteRoutine(idA,idR){
    return this.http.post(this.url+'/postAthleteRoutine',{
      idAthlete:idA,
      idRoutines:idR
    })
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
