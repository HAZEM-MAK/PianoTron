import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rand',
  templateUrl: './rand.component.html',
  styleUrls: ['./rand.component.scss']
})
export class RandComponent  {
  @Input() xvalue :any;
  @Input() yvalue :any;
  @Input() xnum :any;
  xblue:number=1;
  noteime:number =200;
  boardtime:number=2000;
  note_counter:number=16;
 notey: number[] = [47,75,103,131,159,187,215];
 notex: number =50;/* from 250 to 1050*/
 ynum:number=Math.floor(((6*10*Math.random()))/9);
 id=setInterval(()=>{this.xblue=this.xblue+1;if (this.xblue==this.note_counter) {
  this.ynum=Math.floor(((6*10*Math.random()))/9);
  this.xblue=0; 
 }},this.noteime)


}
