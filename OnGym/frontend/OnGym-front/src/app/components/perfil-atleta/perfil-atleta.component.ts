import { Component, OnInit } from '@angular/core';
import { routine } from "../../models/routin";
import { ConnectionBackendService} from "../../services/connection-backend.service";
import { exercise } from "../../models/exercise";

@Component({
  selector: 'app-perfil-atleta',
  templateUrl: './perfil-atleta.component.html',
  styleUrls: ['./perfil-atleta.component.css']
})
export class PerfilAtletaComponent implements OnInit {
  routin:routine;
  exercises:exercise[]=this.routin.exercises;
  constructor(private cb:ConnectionBackendService) { }

  ngOnInit(): void {
    this.cb.getMirutina().subscribe(
      res=>{
        this.routin=res;
      },
      err=>console.log(err)
    )
  }

}
