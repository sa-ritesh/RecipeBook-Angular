import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { DataStorageService } from './data-storabe.service';

import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable()
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService) {}    
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      console.log('s');
      return this.dataStorageService.fetchRecipes();    
  }
}
