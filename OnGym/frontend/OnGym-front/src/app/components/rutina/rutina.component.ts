import { Component, OnInit } from '@angular/core';
import { ConnectionBackendService} from '../../services/connection-backend.service';
import {routine } from '../../models/routin';
import { routine_exercises} from '../../models/routine_exercises';
import { exercise } from "../../models/exercise";

@Component({
  selector: 'app-rutina',
  templateUrl: './rutina.component.html',
  styleUrls: ['./rutina.component.css']
})
export class RutinaComponent implements OnInit {
  constructor(private cb:ConnectionBackendService) { }
  routines:routine[];
  r_e:routine_exercises[];
  e:exercise={
    idExercises:0,
    name:'',
    image:'',
    description:'',
    set:0,
    repetitions:0
  };
  ngOnInit(): void {
    this.traerRoutines();
  }

  traerRoutines(){
    this.cb.getNumberRoutines().subscribe(
      res=>{
        console.log(res);
        this.routines=res;
        for(let i=0;i<this.routines.length;i++){
          this.routines[i].idRoutines=res[i].idRoutines;
          this.routines[i].name=res[i].name;
          this.routines[i].price=res[i].price;
        }
      },
      err=>console.log(err)
    )
    this.cb.getRoutines().subscribe(
      res=>{
        console.log(res);
        this.r_e=res;
        console.log(this.r_e);
        for(let i=0;i<this.r_e.length;i++){
          if(this.r_e[i].idRoutines=this.routines[i].idRoutines){
            this.e.idExercises=this.r_e[i].idExercises;
            this.e.name=this.r_e[i].name;
            this.routines[i].exercises.push(this.e);
            console.log(this.routines);
          }
        }
      },
      err=>console.log(err)
    )
  }
}
