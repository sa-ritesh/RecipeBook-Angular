import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
@Injectable()
export class RecipeService{
    constructor(private slService:ShoppingListService){

    }
   recipeSelected=new Subject<Recipe>();
   recipeChanged=new Subject<Recipe[]>();
  //  private recipes:Recipe[]=[
  //       new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',[new Ingredient('Meat',1), new Ingredient('Feet',1)]),
  //       new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',[new Ingredient('Meat',1), new Ingredient('Feet',1)])
  //     ];
  private recipes:Recipe[]=[];
    setRecipes(recipes:Recipe[]){
         this.recipes=recipes;
         this.recipeChanged.next(this.recipes.slice())
    }
    getRecipesMethod(){
        return this.recipes.slice();
    }
    addIngredientsToShoppingList(ingredients:Ingredient[]){
        this.slService.addIngredients(ingredients);
    }
    getRecipeMethod(index:number):Recipe{
      return this.recipes.slice()[index];
    }
    addRecipe(recipe:Recipe){
     this.recipes.push(recipe);
     this.recipeChanged.next(this.recipes.slice());
    }
    updateRecipe(index:number,newRecipe:Recipe){
     this.recipes[index]=newRecipe;
     this.recipeChanged.next(this.recipes.slice());
    }
    deletRecipe(index:number){
     this.recipes.splice(index,1);
     this.recipeChanged.next(this.recipes.slice());
    }
}