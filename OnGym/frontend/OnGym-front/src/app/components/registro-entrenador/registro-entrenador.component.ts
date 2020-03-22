import { Component, OnInit } from '@angular/core';
import {ConnectionBackendService} from '../../services/connection-backend.service';

@Component({
  selector: 'app-registro-entrenador',
  templateUrl: './registro-entrenador.component.html',
  styleUrls: ['./registro-entrenador.component.css']
})
export class RegistroEntrenadorComponent implements OnInit {


  constructor(private cb:ConnectionBackendService) { }
  entrenador={
    nombres:'',
    primerapellido:'',
    segundoapellido:'',
    correo:'',
    password:'',
  }
  ngOnInit(): void {
  }

  registroentrenador(){
    console.log(this.entrenador);
    this.cb.RegistroEntrenador(this.entrenador).subscribe(res =>{
      console.log(res)
    },
    err=>{
      console.log(err)
    });
  }
}
