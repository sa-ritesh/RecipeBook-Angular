import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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
       })
    }

}