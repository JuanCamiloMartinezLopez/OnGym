import { Component, OnInit } from '@angular/core';
import { exercise } from "../../models/exercise";
import { ConnectionBackendService } from "../../services/connection-backend.service";

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html',
  styleUrls: ['./ejercicio.component.css']
})
export class EjercicioComponent implements OnInit {
  exercises:any=[];

  constructor(private cb:ConnectionBackendService) { }

  ngOnInit(): void {
    this.cb.getEjercicios().subscribe(
      res=>{
        this.exercises=res;
      },
      err=>console.log(err)
    )
  }

  crearEjercicio(){
    
  }

}
