import { Component, OnInit, HostListener } from '@angular/core';
import SoundFont from 'soundfont-player'
import {inputById, MIDI_INPUT, MIDI_OUTPUT, MIDI_SUPPORT, outputByName, SYSEX} from '@ng-web-apis/midi';

var ac = new AudioContext()
// import {Component,HostListener,Directive,HostBinding,Input} from '@angular/core';

@Component({
  selector: 'app-note-board',
  templateUrl: './note-board.component.html',
  styleUrls: ['./note-board.component.scss']

})
export class NoteBoardComponent implements OnInit {
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

  ytime: string[] = []; //conitain every note duiration after the randomation  
  ytime_num = 0; //time index 

  bar_time = 0; //the bar time used for calculation

  number_of_bar_note: number[] = [0, 0, 0, 0, 0, 0, 0, 0]; //how many notse in every bar
  vex_note: string[] = []; //the strings that represent notes on vexflow  library after randomation 
  pleyer_note: string[] = [];//the strings that represent notes on soundfont library after randomation 
  
  xblue = 0; //the note that is been played index on the first staves
  xblue2 = 0;//the note that is been played index on the sacond staves

  ynum: number[] = []; //randumation buffer
  generate_on: boolean = false; //to start randomation process

  bar1_end = false;//ture  when all bar notes in the first stave were played
  bar2_end = false;//ture  when all bar notes in the second stave were played

  id: any;// for the loop

  noteime: number = 72;//note speed it is 72 per min
  smothness: number = 5;// the smothenss of the notes

  timecount: number = 0;// calcolate time for the first stave
  timecount2: number = 0;// calcolate time for the second stave
  
  time_res: number = 50; //the smallest berid of time that count
  total_count: number = 0 // total bar time used for detirmin where shoud the red note apperr

  bar_number: number = 0;// bar index

  w_buttons: any[] = Array(17);//refer to which button was pressed
  b_buttons: any[] = Array(17);

  start_stop: string = "Start"// start or stop playing 

  down_time: number = 0//the time when the key was pressed 
  up_time: number = 0//the time when the key was relased
  total_time: number=0;//releas time  - press time
  press_time:number=0;//the total_time rounded up
  

  single_note_place:number=0; //it say what he is represent for -_-
  lock:boolean=false;// keyboard pressing lock
 
  
  
  ngOnInit() {
    this.midi_init();
    draw_init(); 
    stave_draw();
    init_player();
    this.rand_generat();
    this.vexgenertat();

  }
  constructor() {
  
  }
  @HostListener('window:keydown', ['$event'])//an event called when any keyborde key pressed
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
  @HostListener('window:keyup', ['$event'])//an event called when any keyborde key relessed
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
  bars_generator() //fill the arrays with random patren of notes
  {
    //intitalis the array to null valus
    this.vex_note = Array(128).fill(null);
    this.number_of_bar_note = Array(8).fill(null);
    this.ytime = Array(128).fill(null);
    
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
  rand_generat()
   {
    this.id = setInterval(() => 
    { 
      //the main loop of the program that draw calculate time
      if (this.generate_on)
      {
        
        this.timecount += this.time_res;
        this.timecount2 += this.time_res;
        this.total_count+=this.time_res;


        draw_notes(this.vex_note, this.ytime, this.number_of_bar_note, this.bar_number, this.xblue, this.xblue2);//draw function

        if (this.timecount >= ((1 / parseInt(this.ytime[this.xblue + 16 * this.bar_number])) * 240000) / this.noteime) 
        {
          playnote(this.pleyer_note[this.xblue + 16 * this.bar_number]);// play the note sound
          this.timecount = 0;
          this.xblue++;
          if (this.xblue >= this.number_of_bar_note[this.bar_number])// check if the bar end the notes
          {
            this.xblue--;
            this.bar1_end = true;
          }
        }
        if (this.timecount2 >= (1 / parseInt(this.ytime[this.xblue2 + 16 * (this.bar_number + 4)])) * 240000 / this.noteime) 
        {
          playnote(this.pleyer_note[this.xblue2 + 16 * (this.bar_number + 4)]);// play the note sound
          this.timecount2 = 0;
          this.xblue2++;
          if (this.xblue2 >= this.number_of_bar_note[this.bar_number + 4]) // check if the bar end the notes
          {
            this.xblue2--;
            this.bar2_end = true;
          }
        }
        if (this.bar2_end && this.bar1_end)
        {
          this.bar_number++;
          this.bar2_end = false;
          this.bar1_end = false;
          this.xblue = 0;
          this.xblue2 = 0;
          this.timecount2 = 0;
          this.timecount = 0;
        }
        if (this.bar_number > 3)
         {
          this.bar2_end = false;
          this.bar1_end = false;
          this.xblue = 0;
          this.xblue2 = 0;
          this.bar_number = 0;
          this.total_count=0;
          this.bars_generator();
          draw_erase();
        }
      }
    }, this.time_res)

  }
  generate() // used by html to start and stop 
  {
    this.generate_on = !this.generate_on;
    if (this.generate_on) {
      this.start_stop = "Stop"
    }
    else {
      this.start_stop = "Start"
    }
  }
  vexgenertat() //generat the first bars on first lunch
  {
    this.bars_generator();
    draw_notes(this.vex_note, this.ytime, this.number_of_bar_note, 0, 0, 0);
  }
  whit_button_down(button :number)
  {
    this.w_buttons[button]=1;
    playnote(this.notes_play[button]);
    this.single_note_place=this.total_count;
    this.down_time=performance.now()
  }
  whit_button_up(button: number) 
  {
   
    this.w_buttons[button]=0;
    stopnote();
    
    // single_note_eraser();

    this.up_time = performance.now()
    this.total_time = this.up_time - this.down_time // calculat the pressing time
    this.press_time=Math.round(1/((Math.floor(this.total_time)*this.noteime)/240000))
    console.log(this.press_time.toString())
    if(this.press_time==1 || this.press_time==2|| this.press_time==4 || this.press_time==8 || this.press_time==16)
    single_note(this.notes[button],this.single_note_place,this.press_time.toString(),244.8/((240000)/this.noteime));
    else
    single_note(this.notes[8],this.single_note_place,"1",244.8/((240000)/this.noteime));

    console.log("white number : " + button + " time= " + this.total_time)
  }
  black_button_down(button: number) 
  {
    this.b_buttons[button]=1;
    this.down_time = performance.now()
    console.log("black number : " + button)
  }
  black_button_up(button: number) 
  {
    this.b_buttons[button]=0;
    this.up_time = performance.now()
    this.total_time = this.up_time - this.down_time
    console.log("black number : " + button + " time= " + this.total_time)
  }
  g_speed(speed: HTMLInputElement, smoth: HTMLInputElement) //used by html to set the speed and the smothness
  {
    this.noteime = parseInt(speed.value);
    this.smothness = parseInt(smoth.value);
  }
  midi_init()
  {
    if(MIDI_SUPPORT)
    console.log("midi is supported>>> ")
    if(SYSEX)
    console.log("token responsible for system exclusive access")
    
    window.navigator.requestMIDIAccess()
    .then((midiAccess) => {
        console.log("MIDI Ready!");
        for(let entry of midiAccess.inputs) {
            console.log("MIDI input device: " + entry[1].id)
            entry[1].onmidimessage = onMidiMessage;
        }
    })
    .catch((error) => {
        console.log("Error accessing MIDI devices: " + error);
    });
  }

}


import Vex from 'vexflow';
const Flow = Vex.Flow;
const { Renderer, Stave, StaveNote, Voice, Formatter ,TickContext} = Flow;
var  div, renderer, context,context2,single_stave,single_voice1,piano,tkcontext
var stave1 =new Array()
let noteNames: string[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function onMidiMessage(midiEvent: WebMidi.MIDIMessageEvent): void {
    let data: Uint8Array = midiEvent.data;
    if(data.length === 3)
      {
        // status is the first byte.
        let status = data[0];
        // command is the four most significant bits of the status byte.
        let command = status >>> 4;
        // channel 0-15 is the lower four bits.
        let channel = status & 0xF;

        console.log(`$Command: ${command.toString(16)}, Channel: ${channel.toString(16)}`);

        // just look at note on and note off messages.
        if(command === 0x9 || command === 0x8) {
            // note number is the second byte.
            let note = data[1];
            // velocity is the thrid byte.
            let velocity = data[2];

            let commandName = command === 0x9 ? "Note On " : "Note Off";

            // calculate octave and note name.
            let octave = Math.trunc(note / 12);
            let noteName = noteNames[note % 12];

            console.log(`${commandName} ${noteName}${octave} ${velocity}`);
        }
    }
}
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
  // SoundFont.instrument(ac, '../../assets/soundfont_piano.js').then(function (piano2) {piano=piano2})// play the note from local asset
  SoundFont.instrument(ac, 'acoustic_grand_piano').then(function (piano2) {piano=piano2}) // play the note from internet library
}
function draw_init() {
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
function draw_erase()
{ 
  div.innerHTML = "";
  draw_init();
  stave_draw();
}
function single_note(note:string,time:number,du:string,pos:number) {

  // Create an SVG renderer and attach it to the DIV element named "vf".
 
  
     context2 = renderer.getContext();
      var bar1: Vex.Flow.StaveNote[]=[];
     single_stave = new Stave(20, 40, 300);
    tkcontext=new TickContext();
    single_stave.addClef("treble").addTimeSignature("4/4");
    bar1[0]=new StaveNote({ clef: "treble", keys: [note], duration: du });
     

    bar1[0].setStyle({ fillStyle: "red" });
    
    single_stave.setContext(context2);
    bar1[0].setStave(single_stave);
   // console.log(time*0.06);
    tkcontext.setX((time*pos));
    bar1[0].setTickContext(tkcontext);
    bar1[0].draw();
    // single_voice1 = [new Voice({ num_beats: bar1.length, beat_value: bar1.length }).addTickables(bar1)];
  // var formatter1 = new Formatter().joinVoices(single_voice1).format(single_voice1, 200);
  // console.log("voise "+single_voice1.getMode()) ; 
  // single_voice1.forEach(function (v) { v.draw(context2, single_stave); })
  
}

// function single_note_eraser()
// {
  
//   // const group = context2.openGroup();
 
//   // // Draw your measure as you normally would:
//   // single_voice1.forEach(function (v) { v.draw(context2, single_stave); });
 
//   // // Then close the group:
//   // context2.closeGroup();
 
//   // // And when you want to delete it, do this:
//   // context.svg.removeChild(group); 
// }

function draw_notes(ynote: string[], ynote_dur: string[], y_num: number[], active_bar: number, blue_note: number, blue_note2: number) 
{

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
    for (let index = 0; index < y_num[bar]; index++) 
    {
      switch (bar) 
      {
        case 0: bar1[index] = new StaveNote({ clef: "treble", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
        case 1: bar2[index] = new StaveNote({ clef: "treble", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
        case 2: bar3[index] = new StaveNote({ clef: "treble", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
        case 3: bar4[index] = new StaveNote({ clef: "treble", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
        case 4: bar5[index] = new StaveNote({ clef: "bass", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
        case 5: bar6[index] = new StaveNote({ clef: "bass", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
        case 6: bar7[index] = new StaveNote({ clef: "bass", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
        case 7: bar8[index] = new StaveNote({ clef: "bass", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
      }
    }
  }

  switch (active_bar) 
  {
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


// function rau_stave(ynote: string[], ynote_dur: string[], y_num: number[]) {

//   //const VF = Vex.Flow;

//   // Create an SVG renderer and attach it to the DIV element named "vf".

//   const div = document.getElementById("rau") as HTMLElement
//   div.innerHTML = "";

//   const renderer = new Renderer(div, Renderer.Backends.SVG);
//   renderer.resize(1100, 250);
//   const context = renderer.getContext();

//   context.setFont("Arial", 10).setBackgroundFillStyle("#eed");


//   var stave1: Vex.Flow.Stave[] = [];
//   var stave2: Vex.Flow.Stave[] = [];
//   var x = 20, y = 40, w = 300;
//   stave1[0] = new Stave(x, y, w);
//   stave1[4] = new Stave(x, y + 85, w);
//   stave1[0].addClef("treble").addTimeSignature("4/4");
//   stave1[4].addClef("bass").addTimeSignature("4/4");
//   stave1[0].setContext(context).draw();
//   stave1[4].setContext(context).draw();
//   // Create a stave of width 400 at position 10, 40 on the canvas.
//   for (let index = 1; index < 8; index++) {
//     x += w; y = 40; w = 250;

//     if (index < 4)
//       stave1[index] = new Stave(x, y, w);
//     else if (index == 4)
//       x = 70;
//     else
//       stave1[index] = new Stave(x, y + 85, w);

//     stave1[index].setContext(context).draw();

//   }

//   var bar1: Vex.Flow.StaveNote[] = [];
//   var bar2: Vex.Flow.StaveNote[] = [];
//   var bar3: Vex.Flow.StaveNote[] = [];
//   var bar4: Vex.Flow.StaveNote[] = [];
//   var bar5: Vex.Flow.StaveNote[] = [];
//   var bar6: Vex.Flow.StaveNote[] = [];
//   var bar7: Vex.Flow.StaveNote[] = [];
//   var bar8: Vex.Flow.StaveNote[] = [];
//   var dau_stave = [bar1, bar2, bar3, bar4, bar5, bar6, bar7, bar8];
//   for (let bar = 0; bar < 8; bar++) {
//     for (let index = 0; index < y_num[bar]; index++) {
//       switch (bar) {
//         case 0: bar1[index] = new StaveNote({ clef: "treble", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
//         case 1: bar2[index] = new StaveNote({ clef: "treble", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
//         case 2: bar3[index] = new StaveNote({ clef: "treble", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
//         case 3: bar4[index] = new StaveNote({ clef: "treble", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
//         case 4: bar5[index] = new StaveNote({ clef: "treble", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
//         case 5: bar6[index] = new StaveNote({ clef: "treble", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
//         case 6: bar7[index] = new StaveNote({ clef: "treble", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
//         case 7: bar8[index] = new StaveNote({ clef: "treble", keys: [ynote[index + bar * 16]], duration: ynote_dur[index + bar * 16] }); break;
//       }
//     }
//   }

//   var voice1: Vex.Flow.Voice[] = [];
//   var voice2: Vex.Flow.Voice[] = [];
//   var voice3: Vex.Flow.Voice[] = [];
//   var voice4: Vex.Flow.Voice[] = [];
//   var voice5: Vex.Flow.Voice[] = [];
//   var voice6: Vex.Flow.Voice[] = [];
//   var voice7: Vex.Flow.Voice[] = [];
//   var voice8: Vex.Flow.Voice[] = [];
//   var voices = [voice1, voice2, voice3, voice4, voice5, voice6, voice7, voice8];

//   for (let index = 0; index < voices.length; index++) {
//     voices[index] = [new Voice({ num_beats: dau_stave[index].length, beat_value: dau_stave[index].length }).addTickables(dau_stave[index])];
//     var formatter1 = new Formatter().joinVoices(voices[index]).format(voices[index], 200);
//     voices[index].forEach(function (v) { v.draw(context, stave1[index]); })
//   }
//   // setTimeout(() => {
//   //   notes1[0].setStyle({ fillStyle: "red" });
//   //   voice1.forEach(function (v) { v.draw(context, stave1); })

//   // }, 2000);
// }
