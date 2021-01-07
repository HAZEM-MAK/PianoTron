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
  notey: number =14;//must add 60
 notex: number =50;/* from 250 to 1050*/
 
}
