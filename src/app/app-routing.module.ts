import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes:Routes=[
    {path:'',redirectTo:'/recipes',pathMatch:'full'},
    {path:'recipes',component:RecipesComponent, children:[
        {path:'',component:RecipeStartComponent,pathMatch:'full'},
        {path:'new',component:RecipeEditComponent,pathMatch:'full'},
        {path:':id',component:RecipeDetailComponent,pathMatch:'full'},
        {path:':id/edit',component:RecipeEditComponent,pathMatch:'full'}
    ]},
    {path:'shopping-list',component:ShoppingListComponent},

]
@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{

}