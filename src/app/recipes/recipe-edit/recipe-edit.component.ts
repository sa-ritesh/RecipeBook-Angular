import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number=0; 
  editMode:boolean=false;
  recipeForm:any;
  constructor(private route:ActivatedRoute, private recipeService:RecipeService, private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
       this.id=+params['id'];
       this.editMode=params['id']!=null;
       this.initForm(); 
    })
  }
  private initForm(){
    let recipeName='';
    let recipeImagePath='';
    let recipeDescription='';
    let recipeIngredients:FormArray=new FormArray([]);
    if(this.editMode){
      const recipe=this.recipeService.getRecipeMethod(this.id);
      recipeName=recipe.name;
      recipeImagePath=recipe.imagePath;
      recipeDescription=recipe.description;

      if(recipe.ingredients){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name,Validators.required),
              'amount': new FormControl(ingredient.amount,Validators.required)
            })
          )
        }
      }

    }
    this.recipeForm=new FormGroup({
      'name':new FormControl(recipeName,Validators.required),
      'imagePath': new FormControl(recipeImagePath,Validators.required),
      'description': new FormControl(recipeDescription,Validators.required),
      'ingredients': recipeIngredients
    })
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route})
  }
  onSubmit(){
    // const newRecipe:Recipe=new Recipe(this.recipeForm.value.name,
    //   this.recipeForm.value.description,
    //   this.recipeForm.value.imagePath,
    //   this.recipeForm.value.ingredients)
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,this.recipeForm.value);
    }
    else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }
  onDeleteIngredient(index:number){
    this.recipeForm.get('ingredients').removeAt(index);
  }
  onAddIngredient(){
    this.recipeForm.get('ingredients').push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,Validators.required)
      })
    )
  }
}
