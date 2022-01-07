import { Component, EventEmitter, Output } from "@angular/core";
@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
})
export class HeaderComponent{
@Output() answer=new EventEmitter<{ans:string}>();
onRecipe(){
    this.answer.emit({ans:'recipe'});
}
onShop(){
    this.answer.emit({ans:'shop'});
}
}