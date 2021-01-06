import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RandComponent } from './rand/rand.component';
import { NoteBoardComponent } from './note-board/note-board.component';

@NgModule({
  declarations: [
    AppComponent,
    RandComponent,
    NoteBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
