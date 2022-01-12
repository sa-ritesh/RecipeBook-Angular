import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
    constructor(private authService:AuthService){

    }
    isLoginMode:boolean=false;
    isLoading:boolean=false;
    error:string='';
    onSwitchMode(){
       this.isLoginMode=!this.isLoginMode;
    }
    onSubmit(form:NgForm){
        this.isLoading=true;
        if(this.isLoginMode){

        }
        else{
            if(!form.valid){
                return;
            }
           const email=form.value.email;
           const password=form.value.password;
           this.authService.signUp(email,password).subscribe(
            resData=>{
                this.isLoading=false;
                console.log(resData);
           },error=>{
            this.isLoading=false;
            this.error=error.message;
           })
           form.reset();
        }
    }
}
