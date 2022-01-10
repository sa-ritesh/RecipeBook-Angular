import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{
  ingredientsChanged=new Subject<Ingredient[]>();
  startedEditing=new Subject<number>();
  private ingredients:Ingredient[]=[new Ingredient('Lal Mirch',100),new Ingredient('Hari Mirch',100)];

  getIngredients(){
      //to pass copy
      return this.ingredients.slice();
  }
  updateIngredient(index:number,newIngredient:Ingredient){
  this.ingredients[index]=newIngredient;
  this.ingredientsChanged.next(this.ingredients);
  }
  getIngredient(index:number) : Ingredient{
   return this.ingredients[index];
  }
  addIngredient(ingredient:Ingredient){
      this.ingredients.push(ingredient);
      this.ingredientsChanged.next(this.ingredients);
  }
  addIngredients(ingredients:Ingredient[]){
      this.ingredients.push(...ingredients);
      this.ingredientsChanged.next(this.ingredients);
  }
}