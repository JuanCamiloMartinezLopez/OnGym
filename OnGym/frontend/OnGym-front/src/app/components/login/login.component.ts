import { Component, OnInit } from '@angular/core';
import {ConnectionBackendService} from '../../services/connection-backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from "../../models/user";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registroRedirect:string;
  profileRedirect:string;
  type:string;
  user:user={
    mail:'',
    password:'',
    type:''
  };
  constructor(private cb:ConnectionBackendService, private rutaActiva:ActivatedRoute, private router:Router ) { }

  ngOnInit(): void {
    this.user.type=this.rutaActiva.snapshot.params.type;
    console.log(this.user.type);
    if(this.user.type=='Trainer'){
      this.registroRedirect="/registro/entrenador";
      this.profileRedirect="/perfil/entrenador";
    }else{
      this.registroRedirect="/registro/deportista";
      this.profileRedirect="/perfil/deportista";
    }
  }

  login(){
    console.log(this.user);
    this.cb.logIn(this.user).subscribe(res =>{
      console.log(res);
      localStorage.setItem('token',res.token);
      localStorage.setItem('names',res.names);
      this.router.navigate([this.profileRedirect]);
    },
    err=>{
      console.log(err)
    })
  }


}
