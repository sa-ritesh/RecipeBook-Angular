import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { EMPTY_SUBSCRIPTION } from "rxjs/internal/Subscription";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../recipes/data-storabe.service";
@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy{
    constructor(private dataStorageService:DataStorageService,private authService:AuthService){
    }
    isAuthenticated:boolean=false;
    userSub:Subscription=EMPTY_SUBSCRIPTION;
    onSaveData(){
        this.dataStorageService.storeRecipes();
    }
    onFetchData(){
        this.dataStorageService.fetchRecipes().subscribe((response)=>{
            console.log(response);
        });
    }
    ngOnInit(): void {
        this.userSub=this.authService.user.subscribe((user)=>{
              this.isAuthenticated=user==null?false:true;
        })
    }
    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}