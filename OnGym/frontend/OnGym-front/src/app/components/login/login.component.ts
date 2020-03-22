import { Component, OnInit } from '@angular/core';
import {ConnectionBackendService} from '../../services/connection-backend.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user={
    correo:'',
    password:'',
    type:''
  }
  routeRedirect;
  constructor(private cb:ConnectionBackendService, private rutaActiva:ActivatedRoute) { }

  ngOnInit(): void {
    this.user.type=this.rutaActiva.snapshot.params.type;
    console.log(this.user.type);
    if(this.user.type=='entrenador'){
      this.routeRedirect="/registroEntrenador";
    }else{
      this.routeRedirect="/registroDeportista";
    }
  }

  login(){
    console.log(this.user);
    this.cb.logIn(this.user).subscribe(res =>{
      console.log(res)
    },
    err=>{
      console.log(err)
    })
  }


}
