import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NoteBoardComponent } from './note-board/note-board.component';


const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'app', component:NoteBoardComponent},
  {path:'', redirectTo:'/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
