import { AfterViewInit, asNativeElements, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Form, FormGroup, NgForm } from '@angular/forms';
import { EMPTY, Subscription } from 'rxjs';
import { EMPTY_SUBSCRIPTION } from 'rxjs/internal/Subscription';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy{
  constructor(private slService:ShoppingListService) { }
  @ViewChild('f') slForm:any;
  subscription:Subscription=EMPTY_SUBSCRIPTION;
  editMode:boolean=false;
  editedItemIndex:number=-1;
  editedItem:Ingredient=new Ingredient('',0);

  onAddItem(form:NgForm){
    const value=form.value;
    console.log(value);
    const newIngredient=new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex,newIngredient);
    }
    else{
      this.slService.addIngredient(newIngredient);
    }

  }

  ngOnInit(): void { 
    this.subscription=this.slService.startedEditing.subscribe((index:number)=>{
        this.editMode=true;
        this.editedItemIndex=index;
        this.editedItem=this.slService.getIngredient(index);
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })
    })
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
