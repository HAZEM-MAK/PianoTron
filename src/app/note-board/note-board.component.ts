import { Component, OnInit } from '@angular/core';
import * as VexJS from '../../assets/VexJavaScript.js';

@Component({
  selector: 'app-note-board',
  templateUrl: './note-board.component.html',
  styleUrls: ['./note-board.component.scss']
  
})



export class NoteBoardComponent implements OnInit {
note_counter=16;
 note: number[] = Array(this.note_counter);
 notey =14;
 notex =100;/* from 250 to 1050*/
 f=90;
 xblue=1;
 yblue=1;
 ynum:number[]=[];
 generate_on:boolean=false;
 id:any;
<<<<<<< HEAD
 test:any=0;
 speed:any=document.getElementById("speedm");
 noteime:number =2000;
 smothness:number =5;
=======
 test = 0;
 noteime = 500;
>>>>>>> 999d45c7c40c328177b6929b65b461e99eb1651c
 boardtime:number=2000;
 timecount:number=0;
 time_res:number=100;
 
 

 ngOnInit(){
      

}
 
  constructor() {for (let index = 0; index < this.note_counter+1; index++) {
    this.ynum[index]=Math.floor(((17*10*Math.random()))/9);}
    this.xblue=0; 
    this.yblue=this.ynum[this.xblue];
 this.rand_generat(); }

  rand_generat()
  { 
<<<<<<< HEAD
 
    this.id=setInterval(()=>{
     this.timecount+=this.time_res;
      if(this.generate_on && this.timecount>=this.noteime){
        this.timecount=0;
    this.xblue=this.xblue+1;
=======
    this.id=setInterval(()=>{
      if(this.generate_on)
    this.xblue +=1 ;
>>>>>>> 999d45c7c40c328177b6929b65b461e99eb1651c
    this.yblue=this.ynum[this.xblue];
    if (this.xblue>=this.note_counter) {
      for (let index = 0; index < this.note_counter+1; index++) {
        do{
        this.ynum[index]=Math.floor(((17*10*Math.random()))/9);  
        }while(Math.abs(this.ynum[index]-this.ynum[index-1])>this.smothness) 
      }   
      this.xblue=0; 
      this.yblue=this.ynum[this.xblue];
    }}},this.time_res)
  
  }
  generate()
<<<<<<< HEAD
  {   
    this.generate_on=!this.generate_on;
  }
 
  g_speed(speed:HTMLInputElement,smoth:HTMLInputElement)
  {this.noteime=parseInt(speed.value);this.smothness=parseInt(smoth.value);}
  
=======
  {
    VexJS.test();
    this.generate_on=!this.generate_on;
  }
>>>>>>> 999d45c7c40c328177b6929b65b461e99eb1651c
}
