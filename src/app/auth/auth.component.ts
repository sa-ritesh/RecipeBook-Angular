import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
    constructor(private authService:AuthService, private router:Router){

    }
    onCloseError(){
        this.error='';
    }
    isLoginMode:boolean=false;
    isLoading:boolean=false;
    authObs:Observable<AuthResponseData>=EMPTY;
    error:string='';
    onSwitchMode(){
       this.isLoginMode=!this.isLoginMode;
    }
    onSubmit(form:NgForm){
        this.isLoading=true;
        if(!form.valid){
            return;
        }
       const email=form.value.email;
       const password=form.value.password;
        if(this.isLoginMode){
            this.authObs=this.authService.logIn(email,password);
            form.reset();
        }
        else{
            this.authObs=this.authService.signUp(email,password);
           form.reset();
        }
        this.authObs.subscribe(
            resData=>{
                this.isLoading=false;
                this.router.navigate(['./recipes'])
                console.log(resData);
           },errorMessage=>{
            this.isLoading=false;
            this.error=errorMessage;
           });
    }
}
