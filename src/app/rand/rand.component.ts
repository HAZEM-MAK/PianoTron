import { Component, OnInit } from '@angular/core';
import { RandomNoteGeneratorService } from "../random-note-generator.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rand',
  templateUrl: './rand.component.html',
  styleUrls: ['./rand.component.scss']
})
export class RandComponent implements OnInit  {
  notes = [
    "A/6", "B/6", "C/6", "D/6", "E/6", "F/6", "G/6",
    "A/5", "B/5", "C/5", "D/5", "E/5", "F/5", "G/5", 
    "A/4", "B/4", "C/4", "D/4", "E/4", "F/4", "G/4", 
    "A/3", "B/3", "C/3", "D/3", "E/3", "F/3", "G/3", 
    "A/2", "B/2", "C/2", "D/2", "E/2", "F/2", "G/2", 
  ];  //the strings that represent notes on vexflow library
notes_play = [
        "A6", "B6", "C6", "D6", "E6", "F6", "G6",
        "A5", "B5", "C5", "D5", "E5", "F5", "G5",
        "A4", "B4", "C4", "D4", "E4", "F4", "G4",
        "A3", "B3", "C3", "D3", "E3", "F3", "G3",
        "A2", "B2", "C2", "D2", "E2", "F2", "G2"
      ];//the strings that represent notes on soundfont library
notes_time = ["1", "2", "4", "8", "16"];    //the strings that represent nots duiration on vexflow library
note_time = [1, 0.5, 0.25, 0.125, 0.0625];  //the real note duiration used for calculate the bar time in randomation 
ytime_num = 0; //time index 
bar_time = 0; //the bar time used for calculation
ynum: number[] = []; //randumation buffer


vex_note: string[] = []; //the strings that represent notes on vexflow  library after randomation 
pleyer_note: string[] = [];//the strings that represent notes on soundfont library after randomation 
ytime: string[] = []; //conitain every note duiration after the randomation  
number_of_bar_note: number[] = [0, 0, 0, 0, 0, 0, 0, 0]; //how many notse in every bar

smothness: number = 5;// the smothenss of the notes
constructor(private data: RandomNoteGeneratorService) {

  this.bars_generator();
  this.data.changeMessage(this.vex_note,this.pleyer_note,this.ytime,this.number_of_bar_note)
}

ngOnInit() 
{

}
  bars_generator() //fill the arrays with random patren of notes
  {
    //intitalis the array to null valus
    this.vex_note = new Array(128).fill(null);
    this.number_of_bar_note = new Array(8).fill(null);
    this.ytime = new Array(128).fill(null);
    
    for (let bar = 0; bar < 8; bar++) //scaning 8 bars 4 on the first line and 4 on the second
    {
      this.bar_time = 0; 
      //notes time generat
      for (let index = 0; index < 1000; index++)//randomation process. that is limited by 1000 try, to fit with tha rimaining bar time  
      {
        this.ytime_num = Math.floor((((this.notes_time.length-1) * 9 * Math.random())) / 9);//generat random number from 0 to this.notes_time.length-1  that represent the note time [1,0.5,0.25,0.125.0.0625]
        if (this.bar_time + this.note_time[this.ytime_num] <= 1)
        {
          this.bar_time += this.note_time[this.ytime_num];
          this.ytime[this.number_of_bar_note[bar] + bar * 16] = this.notes_time[this.ytime_num];
          this.number_of_bar_note[bar]++;
          if (this.bar_time == 1) //break the randomation loop whe complete the bar time to 1
            break;
        }
      }
      //note value generat
      for (let index = 0; index < this.number_of_bar_note[bar]; index++) //scanning every note time that generat on the last step
      {
        do 
        {
          this.ynum[index] = Math.floor((((this.notes.length-1) * 9 * Math.random())) / 9);//generat random number from 0 to this.notes.length-1 that represent the note value[a,b,c,d,e,f,g]
        }
        while (Math.abs(this.ynum[index] - this.ynum[index - 1]) > this.smothness)//accept the value if it fit wiith the requierd smothness
        this.vex_note[index + bar * 16] = this.notes[this.ynum[index]];
        this.pleyer_note[index + bar * 16] = this.notes_play[this.ynum[index]];
      }
    }
  }
}
