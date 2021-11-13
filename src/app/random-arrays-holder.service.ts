import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandomArraysHolderService {

  vex_note: string[] = []; //the strings that represent notes on vexflow  library after randomation 
  pleyer_note: string[] = [];//the strings that represent notes on soundfont library after randomation 
  ytime: string[] = []; //conitain every note duiration after the randomation  
  number_of_bar_note: number[] = [0, 0, 0, 0, 0, 0, 0, 0]; //how many notse in every bar
  
   private messageSource1 = new BehaviorSubject(this.vex_note);
   private messageSource2 = new BehaviorSubject(this.pleyer_note);
   private messageSource3= new BehaviorSubject(this.ytime);
   private messageSource4 = new BehaviorSubject(this.number_of_bar_note);
   currentMessage1 = this.messageSource1.asObservable();
   currentMessage2 = this.messageSource2.asObservable();
   currentMessage3 = this.messageSource3.asObservable();
   currentMessage4 = this.messageSource4.asObservable();
  constructor() { }

  changeMessage(vex_note: string[],pleyer_note: string[],ytime: string[],number_of_bar_note:number[]) 
  {
    this.messageSource1.next(vex_note)
    this.messageSource2.next(pleyer_note)
    this.messageSource3.next(ytime)
    this.messageSource4.next(number_of_bar_note)
  }
  
}
