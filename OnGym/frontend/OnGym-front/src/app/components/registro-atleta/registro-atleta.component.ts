import { Component, OnInit } from '@angular/core';
import {ConnectionBackendService} from '../../services/connection-backend.service';
import { athlete } from "../../models/athlete";


@Component({
  selector: 'app-registro-atleta',
  templateUrl: './registro-atleta.component.html',
  styleUrls: ['./registro-atleta.component.css']
})
export class RegistroAtletaComponent implements OnInit {

  constructor(private cb:ConnectionBackendService) { }

  deportista:athlete = {
    names:'',
    surname:'',
    secondsurname:'',
    mail:'',
    password:'',
    address:'',
    phone:'',
    weight:undefined,
    height:undefined
}

  ngOnInit(): void {
  }

  registroatleta(){
    console.log(this.deportista);
    this.cb.RegistroEntrenador(this.deportista).subscribe(res =>{
      console.log(res)
      localStorage.setItem('token',res.token);
    },
    err=>{
      console.log(err)
    });
  }

}
