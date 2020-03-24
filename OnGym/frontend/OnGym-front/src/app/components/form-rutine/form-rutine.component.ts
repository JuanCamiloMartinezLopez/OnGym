import { Component, OnInit } from '@angular/core';
import { ConnectionBackendService } from "../../services/connection-backend.service";
import { routine} from '../../models/routin'
import { exercise } from "../../models/exercise";
@Component({
  selector: 'app-form-rutine',
  templateUrl: './form-rutine.component.html',
  styleUrls: ['./form-rutine.component.css']
})
export class FormRutineComponent implements OnInit {
  routine:routine={
    name:'',
    price:'',
    exercises:[]
  };
  exercises:exercise[];
  iE:number=0;
  constructor(private cb:ConnectionBackendService) { }

  ngOnInit(): void {
    this.cb.getEjercicios().subscribe(
      res=>{
        this.exercises=res;
        console.log(this.exercises)
      },
      err=>console.log(err)
    )
  }

  agregarEjercicios(){
    this.routine.exercises.push(this.exercises[this.iE]);
    console.log(this.routine.exercises)
  }

  crearRutina(){
    this.cb.postRutine(this.routine).subscribe(
      res=>{
        console.log(res);
      },
      err=>console.log(err)
    );
  }
  
  

}
