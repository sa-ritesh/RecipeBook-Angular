import { DATE_PIPE_DEFAULT_TIMEZONE } from "@angular/common";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject,throwError } from "rxjs";
import { catchError,tap } from "rxjs/operators";
import { User } from "./user.model";
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
    constructor(private http:HttpClient, private router:Router){}
    user = new BehaviorSubject<User>(new User('a','a','a',new Date));
    signUp(email:string,password:string){
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDsTbazG9AJqjEH5PiF8YZlWVNrV_Hczr4',{
           email:email,
           password:password,
           returnSecureToke:true
       }).pipe(catchError(this.handleError),tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      }));
    }

    logIn(email:string,password:string){
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDsTbazG9AJqjEH5PiF8YZlWVNrV_Hczr4',
      {
        email:email,
        password:password,
        returnSecureToken:true
      }).pipe(catchError(this.handleError),tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      }));
    }
    private handleAuthentication(
      email: string,
      userId: string,
      token: string,
      expiresIn: number
    ) {
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      const user = new User(email, userId, token, expirationDate);
      this.user.next(user);
      // this.autoLogout(expiresIn * 1000);
      // localStorage.setItem('userData', JSON.stringify(user));
    }
    private handleError(errorRes:HttpErrorResponse){
      let errorMessage='Unknown Error';
        switch(errorRes.error.error.message){
          case 'EMAIL_EXISTS':
              errorMessage='Email Already Exists';
              break;
          case 'EMAIL_NOT_FOUND':
            errorMessage='Email Not Found';
            break;
          case 'INVALID_PASSWORD':
            errorMessage='Password Galat hai bhai';
        }
        return throwError(errorMessage);
    }
    logout(){
      this.user.next(new User('a','a','a',new Date));
      this.router.navigate(['/auth'])
    }
}