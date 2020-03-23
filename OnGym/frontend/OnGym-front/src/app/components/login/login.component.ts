import { Component, OnInit } from '@angular/core';
import {ConnectionBackendService} from '../../services/connection-backend.service';
import { ActivatedRoute, Router } from '@angular/router';


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
  registroRedirect;
  profileRedirect;
  constructor(private cb:ConnectionBackendService, private rutaActiva:ActivatedRoute, private router:Router ) { }

  ngOnInit(): void {
    this.user.type=this.rutaActiva.snapshot.params.type;
    console.log(this.user.type);
    if(this.user.type=='entrenador'){
      this.registroRedirect="/registroEntrenador";
      this.profileRedirect="/perfilEntrenador";
    }else{
      this.registroRedirect="/registroDeportista";
      this.profileRedirect="/perfilDeportista";
    }
  }

  login(){
    console.log(this.user);
    this.cb.logIn(this.user).subscribe(res =>{
      console.log(res);
      localStorage.setItem('token',res.token);
      this.router.navigate([this.profileRedirect]);
    },
    err=>{
      console.log(err)
    })
  }


}
