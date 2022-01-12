import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Subscription } from 'rxjs';
import { EMPTY_SUBSCRIPTION } from 'rxjs/internal/Subscription';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes:Recipe[]=[];
  subscription:Subscription=EMPTY_SUBSCRIPTION;
  constructor(private recipeService:RecipeService, private router:Router, private route:ActivatedRoute) { }
  ngOnInit(): void {
    this.recipes=this.recipeService.getRecipesMethod();
    this.subscription=this.recipeService.recipeChanged.subscribe((recipes)=>{
      this.recipes=recipes;
    })
  }
  //v8076116849
  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
