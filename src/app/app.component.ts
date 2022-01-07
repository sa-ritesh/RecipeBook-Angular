import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  one:boolean=false;
  setValue(event:{ans:string}){
    console.log(event);
    if(event.ans=='recipe'){
      this.one=true;
    }
    else{
      this.one=false;
    }
  }
}
