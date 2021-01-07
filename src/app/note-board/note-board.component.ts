import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-note-board',
  templateUrl: './note-board.component.html',
  styleUrls: ['./note-board.component.scss']
  
})

export class NoteBoardComponent implements OnInit {
 note: number[] = [47,75,103,131,159,187,215,9,9,9,0,6,4,8,9,5];
 notey: number[] = [47,75,103,131,159,187,215];
 notex: number =100;/* from 250 to 1050*/
 yind:number[]=[1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6];
 f: number=90;
 xblue:number=1;
 yblue:number=1;
 ynum:number[]=[];
 id:any;
 
 noteime:number =500;
 boardtime:number=2000;
 note_counter:number=16;
  constructor() { }

  ngOnInit(): void {
    for (let index = 0; index < this.note_counter+1; index++) {
      this.ynum[index]=Math.floor(((6*10*Math.random()))/9);}
     
   this.rand_generat();
  }
  rand_generat()
  { 
    
    this.id=setInterval(()=>{
    this.xblue=this.xblue+1;
    this.yblue=this.ynum[this.xblue];
    if (this.xblue>=this.note_counter) {
      for (let index = 0; index < this.note_counter+1; index++) {
        this.ynum[index]=Math.floor(((6*10*Math.random()))/9);    
      }   
      this.xblue=0; 
      this.yblue=this.ynum[this.xblue];
    }},this.noteime)
  
  }
}
