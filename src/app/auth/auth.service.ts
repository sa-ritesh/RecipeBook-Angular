import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
  }
@Injectable()
export class AuthService{
    constructor(private http:HttpClient){}

    signUp(email:string,password:string){
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDsTbazG9AJqjEH5PiF8YZlWVNrV_Hczr4',{
           email:email,
           password:password,
           returnSecureToke:true
       }).pipe(catchError(errorRes=>{
         let errorMessage='Unknown Error';
        switch(errorRes.error.error.message){
          case 'EMAIL_EXISTS':
              errorMessage='Email Already Exists';
        }
        return throwError(errorMessage);
       }));
    }

}