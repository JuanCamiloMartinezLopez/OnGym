import { Component, OnInit } from '@angular/core';
import {ConnectionBackendService} from '../../services/connection-backend.service';
import { trainer } from "../../models/trainer";

@Component({
  selector: 'app-registro-entrenador',
  templateUrl: './registro-entrenador.component.html',
  styleUrls: ['./registro-entrenador.component.css']
})
export class RegistroEntrenadorComponent implements OnInit {


  constructor(private cb:ConnectionBackendService) { }
  entrenador:trainer={
    names:'',
    surname:'',
    secondsurname:'',
    mail:'',
    password:'',
  }
  ngOnInit(): void {
  }

  registroentrenador(){
    console.log(this.entrenador);
    this.cb.RegistroEntrenador(this.entrenador).subscribe(res =>{
      localStorage.setItem('token',res.token);
      localStorage.setItem('names',this.entrenador.names);
      console.log(res)
    },
    err=>{
      console.log(err)
    });
  }
}
