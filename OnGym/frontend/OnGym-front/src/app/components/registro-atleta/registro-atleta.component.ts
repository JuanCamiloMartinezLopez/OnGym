import { Component, OnInit } from '@angular/core';
import {ConnectionBackendService} from '../../services/connection-backend.service';

@Component({
  selector: 'app-registro-atleta',
  templateUrl: './registro-atleta.component.html',
  styleUrls: ['./registro-atleta.component.css']
})
export class RegistroAtletaComponent implements OnInit {

  constructor(private cb:ConnectionBackendService) { }

  deportista = {
    nombres:'',
    primerapellido:'',
    segundoapellido:'',
    correo:'',
    password:'',
    direccion:'',
    telefono:'',
    peso:undefined,
    estatura:undefined,
    idEntrenadorD:0
}

  ngOnInit(): void {
  }

  registroatleta(){
    console.log(this.deportista);
    this.cb.RegistroEntrenador(this.deportista).subscribe(res =>{
      console.log(res)
    },
    err=>{
      console.log(err)
    });
  }

}
