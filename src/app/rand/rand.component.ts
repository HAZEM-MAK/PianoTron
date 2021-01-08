import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-rand',
  templateUrl: './rand.component.html',
  styleUrls: ['./rand.component.scss']
})
export class RandComponent  {
  @Input() xvalue :any;
  @Input() yvalue :any; 
  @Input() xblue:any
  @Input() yblue: any;
 
  show:boolean=false;
   dashes:number[]=[26,54,215,243,];
   
  notey: number =14;
 notex: number =50;/* from 250 to 1050*/
 
}
