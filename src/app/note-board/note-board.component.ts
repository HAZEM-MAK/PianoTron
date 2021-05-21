import { Component, OnInit, HostListener } from '@angular/core';
import SoundFont from 'soundfont-player'
var ac = new AudioContext()
// import {Component,HostListener,Directive,HostBinding,Input} from '@angular/core';

@Component({
  selector: 'app-note-board',
  templateUrl: './note-board.component.html',
  styleUrls: ['./note-board.component.scss']

})
export class NoteBoardComponent implements OnInit {
  note_counter = 24;
  notes = ["A/4", "B/4", "C/4", "D/4", "E/4", "F/4", "G/4", "R/4", "X/4"];
  notes_play = ["A4", "B4", "C4", "D4", "E4", "F4", "G4", "C5","A4"];
  notes_time = ["1", "2", "4", "8", "16"];
  
  note_time = [1, 0.5, 0.25, 0.125, 0.0625];
  ytime: string[] = [];
  ytime_num = 0;
  bar_time = 0;
  number_of_bar_note: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
  vex_note: string[] = [];
  pleyer_note: string[] = [];
  note: number[] = Array(this.note_counter);
  notey = 14;
  notex = 100;/* from 250 to 1050*/
  f = 90;
  xblue = 0;
  xblue2 = 0;
  yblue = 1;
  ynum: number[] = [];
  generate_on: boolean = false;
  bar1_end = false;
  bar2_end = false;
  id: any;
  i = 0;
  speed: any = document.getElementById("speedm");
  noteime: number = 72;
  smothness: number = 5;
  boardtime: number = 2000;
  timecount: number = 0;
  timecount2: number = 0;
  time_res: number = 50;
  bar_number: number = 0;
  w_buttons: any[] = Array(17);
  b_buttons: any[] = Array(17);
  start_stop: string = "Start"
  down_time: number = 0
  up_time: number = 0
  total_time: number = 0
  note_player_index :number =0
  lock:boolean=false;
  ngOnInit() {

    dau_init();
    stave_draw();
    init_player();
    this.rand_generat();
    this.vexgenertat();

  }

  constructor() {
    //   for (let index = 0; index < this.note_counter + 1; index++) {
    //     this.ynum[index] = Math.floor(((8 * 10 * Math.random())) / 9);
    //     this.vex_note[index] = this.notes[this.ynum[index]];
    //   }
    //   this.xblue = 0;
    //   this.yblue = this.ynum[this.xblue];
    //   this.rand_generat();
  }
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.lock==false)
    {
    switch(event.key)
    {
      case 'a':this.whit_button_down(0);this.lock=true;break;
      case 's':this.whit_button_down(1);this.lock=true;break;
      case 'd':this.whit_button_down(2);this.lock=true;break;
      case 'f':this.whit_button_down(3);this.lock=true;break;
      case 'g':this.whit_button_down(4);this.lock=true;break;
      case 'h':this.whit_button_down(5);this.lock=true;break;
      case 'j':this.whit_button_down(6);this.lock=true;break;
      case 'k':this.whit_button_down(7);this.lock=true;break;
      case 'l':this.whit_button_down(8);this.lock=true;break;
    }
    console.log(event.key);
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEventup(event: KeyboardEvent) {
    switch(event.key)
    {
      case 'a':this.whit_button_up(0);this.lock=false;break;
      case 's':this.whit_button_up(1);this.lock=false;break;
      case 'd':this.whit_button_up(2);this.lock=false;break;
      case 'f':this.whit_button_up(3);this.lock=false;break;
      case 'g':this.whit_button_up(4);this.lock=false;break;
      case 'h':this.whit_button_up(5);this.lock=false;break;
      case 'j':this.whit_button_up(6);this.lock=false;break;
      case 'k':this.whit_button_up(7);this.lock=false;break;
      case 'l':this.whit_button_up(8);this.lock=false;break;
    }
    console.log(event.key);
  }
  bars_generator() {
    this.vex_note = Array(128).fill(null);
    this.number_of_bar_note = Array(8).fill(null);
    this.ytime = Array(128).fill(null);
    // bar_time_generater
    for (let bar = 0; bar < 8; bar++) {
      this.bar_time = 0;
      for (let index = 0; index < 1000; index++) {
        this.ytime_num = Math.floor(((4 * 10 * Math.random())) / 9);
        if (this.bar_time + this.note_time[this.ytime_num] <= 1) {
          this.bar_time += this.note_time[this.ytime_num];
          this.ytime[this.number_of_bar_note[bar] + bar * 16] = this.notes_time[this.ytime_num];
          this.number_of_bar_note[bar]++;
          if (this.bar_time == 1)
            break;
        }
      }
      //bar_note_generat
      for (let index = 0; index < this.number_of_bar_note[bar]; index++) {
        do {
          this.ynum[index] = Math.floor(((8 * 10 * Math.random())) / 9);
        } while (Math.abs(this.ynum[index] - this.ynum[index - 1]) > this.smothness)
        this.vex_note[index + bar * 16] = this.notes[this.ynum[index]];
        this.pleyer_note[index + bar * 16] = this.notes_play[this.ynum[index]];
      }
    }
  }
  rand_generat() {
    this.id = setInterval(() => {
      if (this.generate_on) {
        this.timecount += this.time_res;
        this.timecount2 += this.time_res;
        if (this.timecount >= ((1 / parseInt(this.ytime[this.xblue + 16 * this.bar_number])) * 240000) / this.noteime) {
          dau_notes(this.vex_note, this.ytime, this.number_of_bar_note, this.bar_number, this.xblue, this.xblue2);
          console.log("1= " + this.timecount)
          playnote(this.pleyer_note[this.xblue + 16 * this.bar_number]);
          // console.log("buffer= " + this.pleyer_note[this.xblue + 16 * this.bar_number] + " ynum= "+ (this.xblue + 16 * this.bar_number) )
          this.timecount = 0;
          this.xblue++;
          
          if (this.xblue >= this.number_of_bar_note[this.bar_number])
          {
            this.xblue--;
            this.bar1_end = true;
          }
        }
        if (this.timecount2 >= (1 / parseInt(this.ytime[this.xblue2 + 16 * (this.bar_number + 4)])) * 240000 / this.noteime) {
          dau_notes(this.vex_note, this.ytime, this.number_of_bar_note, this.bar_number, this.xblue, this.xblue2);
          playnote(this.pleyer_note[this.xblue2 + 16 * (this.bar_number + 4)]);
          console.log("2= " + this.timecount2)
          this.timecount2 = 0;
          this.xblue2 = this.xblue2 + 1;
          if (this.xblue2 >= this.number_of_bar_note[this.bar_number + 4]) {
            this.xblue2--;
            this.bar2_end = true;
          }
        }
        if (this.bar2_end && this.bar1_end) {
          console.log("bar end")
          this.bar_number++;
          this.bar2_end = false;
          this.bar1_end = false;
          this.xblue = 0;
          this.xblue2 = 0;
          this.timecount2 = 0;
          this.timecount = 0;
        }
        if (this.bar_number > 3) {
          // this.generate_on=false;
          this.bar2_end = false;
          this.bar1_end = false;
          this.xblue = 0;
          this.xblue2 = 0;
          this.bar_number = 0;
          this.bars_generator();
          dau_erase();
          dau_notes(this.vex_note, this.ytime, this.number_of_bar_note, 0, 0, 0);
        }
      }
    }, this.time_res)

  }
  generate() {
    this.generate_on = !this.generate_on;
    if (this.generate_on) {
      this.start_stop = "Stop"
    }
    else {
      this.start_stop = "Start"
    }
  }
  vexgenertat() {
    this.bars_generator();
    dau_notes(this.vex_note, this.ytime, this.number_of_bar_note, 0, 0, 0);
    //  this.bars_generator();
    //  rau_stave(this.vex_note,this.ytime,this.number_of_bar_note);
  }


  whit_button_down(button :number)
  {
    this.w_buttons[button]=1;
    playnote(this.notes_play[button]);
    single_note(this.notes[button]);
    this.down_time=performance.now()
    console.log("white number : "+button)
  }


  whit_button_up(button: number) {
    this.w_buttons[button]=0;
    stopnote();
    single_note_eraser();

    this.up_time = performance.now()
    this.total_time = this.up_time - this.down_time
    console.log("white number : " + button + " time= " + this.total_time)
  }
  black_button_down(button: number) {
    this.b_buttons[button]=1;
    this.down_time = performance.now()
    console.log("black number : " + button)
  }
  black_button_up(button: number) {
    this.b_buttons[button]=0;
    this.up_time = performance.now()
    this.total_time = this.up_time - this.down_time
    console.log("black number : " + button + " time= " + this.total_time)
  }
  g_speed(speed: HTMLInputElement, smoth: HTMLInputElement) {
    this.noteime = parseInt(speed.value);
    this.smothness = parseInt(smoth.value);
  }
   
}







import Vex from 'vexflow';
const Flow = Vex.Flow;
const { Renderer, Stave, StaveNote, Voice, Formatter } = Flow;
var  div, renderer, context,context2,single_stave,single_voice1,piano
var stave1 =new Array()


function playnote(note: string ) 
{
  // piano2.play(note,ac.currentTime, { duration: 0.5})
  piano.play(note)
}


function stopnote() 
{
  piano.stop()
}
function init_player()
{
  SoundFont.instrument(ac, '../../assets/soundfont_piano.js').then(function (piano2) {piano=piano2})
}


function dau_init() {
  div = document.getElementById("dau") as HTMLElement;
  renderer = new Renderer(div, Renderer.Backends.SVG);
  context = renderer.getContext();
  renderer.resize(1100, 250);
  context.setFont("Arial", 10).setBackgroundFillStyle("#eed");
}
function stave_draw() {
  var connect1: Vex.Flow.StaveConnector;
  var x = 20, y = 40, w = 300;
  stave1[0] = new Stave(x, y, w);
  stave1[4] = new Stave(x, y + 85, w);
  stave1[0].addClef("treble").addTimeSignature("4/4");
  stave1[4].addClef("bass").addTimeSignature("4/4");
  connect1 = new Vex.Flow.StaveConnector(stave1[0], stave1[4]);
  connect1.setType(Vex.Flow.StaveConnector.type.SINGLE_LEFT);
  stave1[0].setContext(context).draw();
  stave1[4].setContext(context).draw();
  connect1.setContext(context).draw();

  for (let index = 1; index < 8; index++) {
    x += w; y = 40; w = 250;
    if (index < 4)
      stave1[index] = new Stave(x, y, w);
    else if (index == 4)
      x = 70;
    else
      stave1[index] = new Stave(x, y + 85, w);
    stave1[index].setContext(context).draw();
  }
}
function dau_erase()
{ 
  div.innerHTML = "";
  dau_init();
  stave_draw();
}

function single_note(note:string) {

  // Create an SVG renderer and attach it to the DIV element named "vf".
 
  
     context2 = renderer.getContext();
      var bar1: Vex.Flow.StaveNote[]=[];
     single_stave = new Stave(20, 40, 300);
    single_stave.addClef("treble").addTimeSignature("4/4");
    bar1[0]=new StaveNote({ clef: "treble", keys: [note], duration: "1" });
       

    bar1[0].setStyle({ fillStyle: "red" });
    
    

     single_voice1 = [new Voice({ num_beats: bar1.length, beat_value: bar1.length }).addTickables(bar1)];
   var formatter1 = new Formatter().joinVoices(single_voice1).format(single_voice1, 200);
   single_voice1.forEach(function (v) { v.draw(context2, single_stave); })
  
}

function single_note_eraser()
{
  
  const group = context2.openGroup();
 
  // Draw your measure as you normally would:
  single_voice1.forEach(function (v) { v.draw(context2, single_stave); });
 
  // Then close the group:
  context2.closeGroup();
 
  // And when you want to delete it, do this:
  context.svg.removeChild(group); 
}

function dau_notes(ynote: string[], ynote_dur: string[], y_num: number[], active_bar: number, blue_note: number, blue_note2: number) {

  // Create an SVG renderer and attach it to the DIV element named "vf".
  var bar1: Vex.Flow.StaveNote[] = [];
  var bar2: Vex.Flow.StaveNote[] = [];
  var bar3: Vex.Flow.StaveNote[] = [];
  var bar4: Vex.Flow.StaveNote[] = [];
  var bar5: Vex.Flow.StaveNote[] = [];
  var bar6: Vex.Flow.StaveNote[] = [];
  var bar7: Vex.Flow.StaveNote[] = [];
  var bar8: Vex.Flow.StaveNote[] = [];
  var dau_stave = [bar1, bar2, bar3, bar4, bar5, bar6, bar7, bar8];

  for (let bar = 0; bar < 8; bar++) {
    for (let index = 0; index < y_num[bar]; index++) {
      switch (bar) {
        case 0: bar1[index] = new StaveNote({ clef: "treble", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
        case 1: bar2[index] = new StaveNote({ clef: "treble", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
        case 2: bar3[index] = new StaveNote({ clef: "treble", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
        case 3: bar4[index] = new StaveNote({ clef: "treble", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
        case 4: bar5[index] = new StaveNote({ clef: "treble", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
        case 5: bar6[index] = new StaveNote({ clef: "treble", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
        case 6: bar7[index] = new StaveNote({ clef: "treble", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
        case 7: bar8[index] = new StaveNote({ clef: "treble", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
      }
    }
  }

  switch (active_bar) {
    case 0: bar1[blue_note].setStyle({ fillStyle: "blue" }); bar5[blue_note2].setStyle({ fillStyle: "blue" }); break;
    case 1: bar2[blue_note].setStyle({ fillStyle: "blue" }); bar6[blue_note2].setStyle({ fillStyle: "blue" }); break;
    case 2: bar3[blue_note].setStyle({ fillStyle: "blue" }); bar7[blue_note2].setStyle({ fillStyle: "blue" }); break;
    case 3: bar4[blue_note].setStyle({ fillStyle: "blue" }); bar8[blue_note2].setStyle({ fillStyle: "blue" }); break;
  }

  var voice1: Vex.Flow.Voice[] = [];
  var voice2: Vex.Flow.Voice[] = [];
  var voice3: Vex.Flow.Voice[] = [];
  var voice4: Vex.Flow.Voice[] = [];
  var voice5: Vex.Flow.Voice[] = [];
  var voice6: Vex.Flow.Voice[] = [];
  var voice7: Vex.Flow.Voice[] = [];
  var voice8: Vex.Flow.Voice[] = [];
  var voices = [voice1, voice2, voice3, voice4, voice5, voice6, voice7, voice8];

  for (let index = 0; index < voices.length; index++) {
    voices[index] = [new Voice({ num_beats: dau_stave[index].length, beat_value: dau_stave[index].length }).addTickables(dau_stave[index])];
    var formatter1 = new Formatter().joinVoices(voices[index]).format(voices[index], 200);
    voices[index].forEach(function (v) { v.draw(context, stave1[index]); })
  }
}


function rau_stave(ynote: string[], ynote_dur: string[], y_num: number[]) {

  //const VF = Vex.Flow;

  // Create an SVG renderer and attach it to the DIV element named "vf".

  const div = document.getElementById("rau") as HTMLElement
  div.innerHTML = "";

  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(1100, 250);
  const context = renderer.getContext();

  context.setFont("Arial", 10).setBackgroundFillStyle("#eed");


  var stave1: Vex.Flow.Stave[] = [];
  var stave2: Vex.Flow.Stave[] = [];
  var x = 20, y = 40, w = 300;
  stave1[0] = new Stave(x, y, w);
  stave1[4] = new Stave(x, y + 85, w);
  stave1[0].addClef("treble").addTimeSignature("4/4");
  stave1[4].addClef("bass").addTimeSignature("4/4");
  stave1[0].setContext(context).draw();
  stave1[4].setContext(context).draw();
  // Create a stave of width 400 at position 10, 40 on the canvas.
  for (let index = 1; index < 8; index++) {
    x += w; y = 40; w = 250;

    if (index < 4)
      stave1[index] = new Stave(x, y, w);
    else if (index == 4)
      x = 70;
    else
      stave1[index] = new Stave(x, y + 85, w);

    stave1[index].setContext(context).draw();

  }

  var bar1: Vex.Flow.StaveNote[] = [];
  var bar2: Vex.Flow.StaveNote[] = [];
  var bar3: Vex.Flow.StaveNote[] = [];
  var bar4: Vex.Flow.StaveNote[] = [];
  var bar5: Vex.Flow.StaveNote[] = [];
  var bar6: Vex.Flow.StaveNote[] = [];
  var bar7: Vex.Flow.StaveNote[] = [];
  var bar8: Vex.Flow.StaveNote[] = [];
  var dau_stave = [bar1, bar2, bar3, bar4, bar5, bar6, bar7, bar8];
  for (let bar = 0; bar < 8; bar++) {
    for (let index = 0; index < y_num[bar]; index++) {
      switch (bar) {
        case 0: bar1[index] = new StaveNote({ clef: "treble", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
        case 1: bar2[index] = new StaveNote({ clef: "treble", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
        case 2: bar3[index] = new StaveNote({ clef: "treble", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
        case 3: bar4[index] = new StaveNote({ clef: "treble", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
        case 4: bar5[index] = new StaveNote({ clef: "treble", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
        case 5: bar6[index] = new StaveNote({ clef: "treble", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
        case 6: bar7[index] = new StaveNote({ clef: "treble", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
        case 7: bar8[index] = new StaveNote({ clef: "treble", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
      }
    }
  }

  var voice1: Vex.Flow.Voice[] = [];
  var voice2: Vex.Flow.Voice[] = [];
  var voice3: Vex.Flow.Voice[] = [];
  var voice4: Vex.Flow.Voice[] = [];
  var voice5: Vex.Flow.Voice[] = [];
  var voice6: Vex.Flow.Voice[] = [];
  var voice7: Vex.Flow.Voice[] = [];
  var voice8: Vex.Flow.Voice[] = [];
  var voices = [voice1, voice2, voice3, voice4, voice5, voice6, voice7, voice8];

  for (let index = 0; index < voices.length; index++) {
    voices[index] = [new Voice({ num_beats: dau_stave[index].length, beat_value: dau_stave[index].length }).addTickables(dau_stave[index])];
    var formatter1 = new Formatter().joinVoices(voices[index]).format(voices[index], 200);
    voices[index].forEach(function (v) { v.draw(context, stave1[index]); })
  }
  // setTimeout(() => {
  //   notes1[0].setStyle({ fillStyle: "red" });
  //   voice1.forEach(function (v) { v.draw(context, stave1); })

  // }, 2000);
}
