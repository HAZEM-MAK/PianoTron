import { Component, OnInit } from '@angular/core';
import * as VexJS from '../../assets/VexJavaScript.js';

@Component({
  selector: 'app-note-board',
  templateUrl: './note-board.component.html',
  styleUrls: ['./note-board.component.scss']
  
})
export class NoteBoardComponent implements OnInit {
note_counter=24;
notes=["A/4","B/4","C/4","D/4","E/4","F/4","G/4","R/4","X/4"];
vex_note:string[]=[];
 note: number[] = Array(this.note_counter);
 notey =14;
 notex =100;/* from 250 to 1050*/
 f=90;
 xblue=1;
 yblue=1;
 ynum:number[]=[];
 generate_on:boolean=false;
 id:any;

 speed:any=document.getElementById("speedm");
 noteime:number =2000;
 smothness:number =5;
 boardtime:number=2000;
 timecount:number=0;
 time_res:number=100;
 
 

 ngOnInit(){
  this.vexgenertat(true);
}
 
  constructor() {
    
    for (let index = 0; index < this.note_counter+1; index++) {
    this.ynum[index]=Math.floor(((8*10*Math.random()))/9);
  this.vex_note[index]=this.notes[this.ynum[index]];
  }
    this.xblue=0; 
    this.yblue=this.ynum[this.xblue];
 this.rand_generat();
 
 }

  rand_generat()
  { 
 
    this.id=setInterval(()=>{
     this.timecount+=this.time_res;
      if(this.generate_on && this.timecount>=this.noteime){
        this.timecount=0;
    this.xblue=this.xblue+1;
    this.yblue=this.ynum[this.xblue];
    if (this.xblue>=this.note_counter) {
      for (let index = 0; index < this.note_counter+1; index++) {
        do{
        this.ynum[index]=Math.floor(((8*10*Math.random()))/9);  
        }while(Math.abs(this.ynum[index]-this.ynum[index-1])>this.smothness) 
        this.vex_note[index]=this.notes[this.ynum[index]];
      }   
      this.xblue=0; 
      this.yblue=this.ynum[this.xblue];
      this.vexgenertat(false);
    }}},this.time_res)
  
  }
  generate()
  {   
    this.generate_on=!this.generate_on;
  }

  vexgenertat(on_int)
  {
    
    VexJS.test(this.vex_note,on_int);
  }
  
  g_speed(speed:HTMLInputElement,smoth:HTMLInputElement)
  {this.noteime=parseInt(speed.value);this.smothness=parseInt(smoth.value);}
  
 
}
