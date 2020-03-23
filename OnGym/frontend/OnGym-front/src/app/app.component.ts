import { Component } from '@angular/core';
import { ConnectionBackendService } from "./services/connection-backend.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OnGym-front';

  constructor(private cb:ConnectionBackendService){

  }

  logout(){
    this.cb.LoggedOut();
  }
}
