import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{
  ingredientsChanged=new EventEmitter<Ingredient[]>();
  private ingredients:Ingredient[]=[new Ingredient('Lal Mirch',100),new Ingredient('Hari Mirch',100)];

  getIngredients(){
      //to pass copy
      return this.ingredients.slice();
  }
  addIngredient(ingredient:Ingredient){
      this.ingredients.push(ingredient);
      this.ingredientsChanged.emit(this.ingredients);
  }
  addIngredients(ingredients:Ingredient[]){
      this.ingredients.push(...ingredients);
      this.ingredientsChanged.emit(this.ingredients);
  }
}