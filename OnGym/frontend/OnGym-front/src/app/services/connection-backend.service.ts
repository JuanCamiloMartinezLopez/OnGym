import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ConnectionBackendService {
  private url='http://localhost:4000/OnGym-api';

  constructor(private http:HttpClient) { }

  logIn(user){
    return this.http.post<any>(this.url+'/login',user);
  }

  RegistroEntrenador(entrenador){
    return this.http.post<any>(this.url+'/registroEntrenador',entrenador);
  }

  RegistroDeportista(deportista){
    return this.http.post<any>(this.url+'/registroDeportista',deportista);
  }

}
