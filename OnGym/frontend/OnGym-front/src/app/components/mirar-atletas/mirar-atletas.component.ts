import { Component, OnInit } from '@angular/core';
import { ConnectionBackendService } from "../../services/connection-backend.service";
import { athlete } from "../../models/athlete";

@Component({
  selector: 'app-mirar-atletas',
  templateUrl: './mirar-atletas.component.html',
  styleUrls: ['./mirar-atletas.component.css']
})
export class MirarAtletasComponent implements OnInit {
  athletes:any=[];
  constructor(private cb:ConnectionBackendService) { }

  ngOnInit(): void {
    this.cb.getDeportistas().subscribe(
      res=>{
        this.athletes=res;
      },
      err=>console.error(err)
    );
  }

}
