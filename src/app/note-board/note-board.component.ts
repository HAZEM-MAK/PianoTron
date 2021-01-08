import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-note-board',
  templateUrl: './note-board.component.html',
  styleUrls: ['./note-board.component.scss']
  
})

export class NoteBoardComponent implements OnInit {
note_counter:number=16;
 note: number[] = Array(this.note_counter);
 notey: number =14;
 notex: number =100;/* from 250 to 1050*/
 f: number=90;
 xblue:number=1;
 yblue:number=1;
 ynum:number[]=[];
 generate_on:boolean=false;
 id:any;
 
 noteime:number =200;
 boardtime:number=2000;
 
  constructor() { }

  ngOnInit(): void {
    for (let index = 0; index < this.note_counter+1; index++) {
      this.ynum[index]=Math.floor(((17*10*Math.random()))/9);}
      this.xblue=0; 
      this.yblue=this.ynum[this.xblue];
   this.rand_generat();
  }
  rand_generat()
  { 
    
    this.id=setInterval(()=>{
      if(this.generate_on)
    this.xblue=this.xblue+1;
    this.yblue=this.ynum[this.xblue];
    if (this.xblue>=this.note_counter) {
      for (let index = 0; index < this.note_counter+1; index++) {
        this.ynum[index]=Math.floor(((17*10*Math.random()))/9);    
      }   
      this.xblue=0; 
      this.yblue=this.ynum[this.xblue];
    }},this.noteime)
  
  }
  generate()
  {
    this.generate_on=!this.generate_on;
  }
}
