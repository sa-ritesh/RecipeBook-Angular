import { Component, EventEmitter, Output } from "@angular/core";
import { DataStorageService } from "../recipes/data-storabe.service";
@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
})
export class HeaderComponent{
    constructor(private dataStorageService:DataStorageService){
    }
    onSaveData(){
        this.dataStorageService.storeRecipes();
    }
    onFetchData(){
        this.dataStorageService.fetchRecipes();
    }
}