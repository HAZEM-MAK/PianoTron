import { Component, OnInit } from '@angular/core';
import * as VexJS from '../../assets/VexJavaScript.js';

@Component({
  selector: 'app-note-board',
  templateUrl: './note-board.component.html',
  styleUrls: ['./note-board.component.scss']
  
})
export class NoteBoardComponent implements OnInit {
note_counter=16;
notes=["A","B","C","D","E","F","G","R","X"];
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
  VexJS.test(this.ynum);   

}
 
  constructor() {
    
    for (let index = 0; index < this.note_counter+1; index++) {
    this.ynum[index]=Math.floor(((8*10*Math.random()))/9);}
    this.xblue=0; 
    this.yblue=this.ynum[this.xblue];
 this.rand_generat(); }

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
      }   
      this.xblue=0; 
      this.yblue=this.ynum[this.xblue];
    }}},this.time_res)
  
  }
  generate()
  {  VexJS.test(this.ynum); 
    this.generate_on=!this.generate_on;
  }

  g_speed(speed:HTMLInputElement,smoth:HTMLInputElement)
  {this.noteime=parseInt(speed.value);this.smothness=parseInt(smoth.value);}
  
 
}
