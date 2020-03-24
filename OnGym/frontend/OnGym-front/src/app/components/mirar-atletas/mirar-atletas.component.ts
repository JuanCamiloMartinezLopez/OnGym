import { Component, OnInit } from '@angular/core';
import { ConnectionBackendService } from "../../services/connection-backend.service";
import { athlete } from "../../models/athlete";
import { routine} from '../../models/routin';

@Component({
  selector: 'app-mirar-atletas',
  templateUrl: './mirar-atletas.component.html',
  styleUrls: ['./mirar-atletas.component.css']
})
export class MirarAtletasComponent implements OnInit {
  athletes:any=[];
  routin:routine[];
  ie:number=0;
  constructor(private cb:ConnectionBackendService) { }

  ngOnInit(): void {
    this.cb.getDeportistas().subscribe(
      res=>{
        this.athletes=res;
      },
      err=>console.error(err)
    );
    this.cb.getNumberRoutines().subscribe(
      res=>{
        this.routin=res;
      },
      err=>console.error(err)
    )
  }

  asignarRutina(idA){
    console.log(this.routin[0])
   this.cb.postAthleteRoutine(idA,this.routin[this.ie-1].idRoutines).subscribe(
     res=>console.log(res),
     err=>console.log(err)
   )
  }

}
