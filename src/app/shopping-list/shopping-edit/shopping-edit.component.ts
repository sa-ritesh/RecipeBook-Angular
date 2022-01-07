import { AfterViewInit, asNativeElements, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit{
  @ViewChild('nameInput') nameInputRef:any;
  @ViewChild('amountInput') amountInputRef:any;
  @Output() ingredientAdded=new EventEmitter<Ingredient>();
  constructor() { }

  onAddItem(){
   
    const newIngredient=new Ingredient(this.nameInputRef.nativeElement.value,this.nameInputRef.nativeElement.value);
    this.ingredientAdded.emit(newIngredient);
  }
  ngOnInit(): void {
  }
}
