import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteBoardComponent } from './note-board/note-board.component';
import { HomeComponent } from './home/home.component';
//import { MatSliderModule } from '@angular/material/slider';
//import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [

    AppComponent,
    NoteBoardComponent,
    HomeComponent
  ],
  imports: [
    //FormsModule,
    //MatSliderModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    HomeComponent
  ]
})
export class AppModule { }
