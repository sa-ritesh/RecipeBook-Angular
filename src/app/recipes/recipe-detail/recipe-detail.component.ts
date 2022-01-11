import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  constructor(private recipeService:RecipeService, private route :ActivatedRoute, private router:Router) {

   }
  recipe:Recipe=new Recipe('','','',[]);
  id:number=1;
  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id=+params['id'];
      this.recipe=this.recipeService.getRecipeMethod(this.id);
    })
  }
  onEditRecipe(){
     this.router.navigate(['edit'],{relativeTo:this.route});
  }
  onDeleteRecipe(){
    this.recipeService.deletRecipe(this.id);
  }

}
