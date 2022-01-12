import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoggedIn:boolean=false;
    onSwitch(){
       this.isLoggedIn=!this.isLoggedIn;
    }
}
