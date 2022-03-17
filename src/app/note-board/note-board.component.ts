import { Component, OnInit, HostListener } from '@angular/core';
import SoundFont from 'soundfont-player'
import { MIDI_SUPPORT, SYSEX } from '@ng-web-apis/midi';
import { RandomNoteGeneratorService } from "../random-note-generator.service";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Vex from 'vexflow';
import { keyMap, notes, notes_play } from './constants';

// import {Component,HostListener,Directive,HostBinding,Input} from '@angular/core';

@Component({
  selector: 'app-note-board',
  templateUrl: './note-board.component.html',
  styleUrls: ['./note-board.component.scss']

})
export class NoteBoardComponent implements OnInit {
  ac = new AudioContext()

  // notes_time = ["1", "2", "4", "8", "16"];    //the strings that represent nots duiration on vexflow library
  // note_time = [1, 0.5, 0.25, 0.125, 0.0625];  //the real note duiration used for calculate the bar time in randomation 

  ytime: string[] = []; //conitain every note duiration after the randomation  
  // ytime_num = 0; //time index 

  // bar_time = 0; //the bar time used for calculation

  number_of_bar_note: number[] = [0, 0, 0, 0, 0, 0, 0, 0]; //how many notse in every bar
  vex_note: string[] = []; //the strings that represent notes on vexflow  library after randomation 
  pleyer_note: string[] = [];//the strings that represent notes on soundfont library after randomation 

  xblue = 0; //the note that is been played index on the first staves
  xblue2 = 0;//the note that is been played index on the sacond staves

  // ynum: number[] = []; //randumation buffer
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

  w_buttons: any[] = new Array(17);//refer to which button was pressed
  b_buttons: any[] = new Array(17);

  start_stop: string = "Start"// start or stop playing 

  down_time: number = 0//the time when the key was pressed 
  up_time: number = 0//the time when the key was relased
  total_time: number = 0;//releas time  - press time
  press_time: number = 0;//the total_time rounded up


  single_note_place: number = 0; //it say what he is represent for -_-
  lock: boolean = false;// keyboard pressing lock





  Flow = Vex.Flow;

  div: any;
  renderer: any;
  context: any
  context2: any
  single_stave: any
  single_voice1: any
  piano: any
  tkcontext: any
  stave1 = new Array()
  noteNames: string[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

  notes_time = ["1", "2", "4", "8", "16"];    //the strings that represent nots duiration on vexflow library
  note_time = [1, 0.5, 0.25, 0.125, 0.0625];  //the real note duiration used for calculate the bar time in randomation 
  ytime_num = 0; //time index 
  bar_time = 0; //the bar time used for calculation
  ynum: number[] = []; //randumation buffer

  onMidiMessage(midiEvent: WebMidi.MIDIMessageEvent): void {

    let data: Uint8Array = midiEvent.data;
    if (data.length === 3) {
      // status is the first byte.
      let status = data[0];
      // command is the four most significant bits of the status byte.
      let command = status >>> 4;
      // channel 0-15 is the lower four bits.
      let channel = status & 0xF;

      console.log(`$Command: ${command.toString(16)}, Channel: ${channel.toString(16)}`);

      // just look at note on and note off messages.
      if (command === 0x9 || command === 0x8) {
        // note number is the second byte.
        let note = data[1];
        // velocity is the thrid byte.
        let velocity = data[2];

        let commandName = command === 0x9 ? "Note On " : "Note Off";

        // calculate octave and note name.
        let octave = Math.trunc(note / 12);
        let noteName = this.noteNames[note % 12];

        console.log(`${commandName} ${noteName}${octave} ${velocity}`);
      }
    }
  }
  playnote(note: string) {
    // piano2.play(note,ac.currentTime, { duration: 0.5})
    this.piano.play(note)
  }
  stopnote() {
    this.piano.stop()
  }
  async init_player() {
    // SoundFont.instrument(ac, '../../assets/soundfont_piano.js').then(function (piano2) {piano=piano2})// play the note from local asset
    this.piano = await SoundFont.instrument(this.ac, 'acoustic_grand_piano');
    // play the note from internet library
  }
  draw_init() {
    this.div = document.getElementById("dau") as HTMLElement;

    this.renderer = new Vex.Flow.Renderer(this.div, Vex.Flow.Renderer.Backends.SVG);
    this.context = this.renderer.getContext();
    this.renderer.resize(1100, 250);
    this.context.setFont("Arial", 10).setBackgroundFillStyle("#eed");
  }
  stave_draw() {
    var connect1: Vex.Flow.StaveConnector;
    var x = 20, y = 40, w = 300;
    this.stave1[0] = new Vex.Flow.Stave(x, y, w);
    this.stave1[4] = new Vex.Flow.Stave(x, y + 85, w);
    this.stave1[0].addClef("treble").addTimeSignature("4/4");
    this.stave1[4].addClef("bass").addTimeSignature("4/4");
    connect1 = new Vex.Flow.StaveConnector(this.stave1[0], this.stave1[4]);
    connect1.setType(Vex.Flow.StaveConnector.type.SINGLE_LEFT);
    this.stave1[0].setContext(this.context).draw();
    this.stave1[4].setContext(this.context).draw();
    connect1.setContext(this.context).draw();

    for (let index = 1; index < 8; index++) {
      x += w; y = 40; w = 250;
      if (index < 4)
        this.stave1[index] = new Vex.Flow.Stave(x, y, w);
      else if (index == 4)
        x = 70;
      else
        this.stave1[index] = new Vex.Flow.Stave(x, y + 85, w);
      this.stave1[index].setContext(this.context).draw();
    }
  }
  draw_erase() {
    this.div.innerHTML = "";
    this.draw_init();
    this.stave_draw();
  }
  single_note(note: string, time: number, du: string, pos: number) {

    // Create an SVG renderer and attach it to the DIV element named "vf".


    this.context2 = this.renderer.getContext();
    var bar1: Vex.Flow.StaveNote[] = [];
    this.single_stave = new Vex.Flow.Stave(20, 40, 300);
    this.tkcontext = new Vex.Flow.TickContext();
    this.single_stave.addClef("treble").addTimeSignature("4/4");
    bar1[0] = new Vex.Flow.StaveNote({ clef: "treble", keys: [note], duration: du });


    bar1[0].setStyle({ fillStyle: "red" });

    this.single_stave.setContext(this.context2);
    bar1[0].setStave(this.single_stave);
    // console.log(time*0.06);
    this.tkcontext.setX((time * pos));
    bar1[0].setTickContext(this.tkcontext);
    bar1[0].draw();
    // single_voice1 = [new Voice({ num_beats: bar1.length, beat_value: bar1.length }).addTickables(bar1)];
    // var formatter1 = new Formatter().joinVoices(single_voice1).format(single_voice1, 200);
    // console.log("voise "+single_voice1.getMode()) ; 
    // single_voice1.forEach(function (v) { v.draw(context2, single_stave); })

  }

  //  single_note_eraser()
  // {

  //   // const group = context2.openGroup();

  //   // // Draw your measure as you normally would:
  //   // single_voice1.forEach(function (v) { v.draw(context2, single_stave); });

  //   // // Then close the group:
  //   // context2.closeGroup();

  //   // // And when you want to delete it, do this:
  //   // context.svg.removeChild(group); 
  // }

  draw_notes(ynote: string[], ynote_dur: string[], y_num: number[], active_bar: number, blue_note: number, blue_note2: number) {

    var bar1: Vex.Flow.StaveNote[] = [];
    const dau_stave: any[] = new Array(8).fill(0).map(x => [])

    for (let bar = 0; bar < 8; bar++) {
      console.log('YNUM: ', bar, y_num[bar]);

      for (let index = 0; index < y_num[bar]; index++) {
        const clef = bar < 4 ? 'bass' : "treble";
        dau_stave[bar][index] = new Vex.Flow.StaveNote({
          clef,
          keys: [ynote[index + bar * 16]],
          duration: ynote_dur[index + bar * 16]
        });
      }
    }
    console.log(
      dau_stave);

    switch (active_bar) {
      case 0: dau_stave[0][blue_note].setStyle({ fillStyle: "blue" }); dau_stave[4][blue_note2].setStyle({ fillStyle: "blue" }); break;
      case 1: dau_stave[1][blue_note].setStyle({ fillStyle: "blue" }); dau_stave[5][blue_note2].setStyle({ fillStyle: "blue" }); break;
      case 2: dau_stave[2][blue_note].setStyle({ fillStyle: "blue" }); dau_stave[6][blue_note2].setStyle({ fillStyle: "blue" }); break;
      case 3: dau_stave[3][blue_note].setStyle({ fillStyle: "blue" }); dau_stave[7][blue_note2].setStyle({ fillStyle: "blue" }); break;
    }



    const voices: any[] = new Array(8).fill(0).map(x => [])
    for (let index = 0; index < voices.length; index++) {
      voices[index] = [new Vex.Flow.Voice({ num_beats: dau_stave[index].length, beat_value: dau_stave[index].length }).addTickables(dau_stave[index])];
      var formatter1 = new Vex.Flow.Formatter().joinVoices(voices[index]).format(voices[index], 200);
      voices[index].forEach(v => v.draw(this.context, this.stave1[index]))
    }
  }


  //  rau_stave(ynote: string[], ynote_dur: string[], y_num: number[]) {

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



  ngOnInit() {
    const { Renderer, Stave, StaveNote, Voice, Formatter, TickContext } = this.Flow;
    this.midi_init();
    this.draw_init();
    this.stave_draw();
    this.init_player();
    this.rand_generat();
    this.vexgenertat();
    this.data.changeMessage(this.vex_note, this.pleyer_note, this.ytime, this.number_of_bar_note)

  }
  constructor(private data: RandomNoteGeneratorService,) {
    this.data.currentMessage1.pipe(takeUntil(this.destroyed)).subscribe(vex_note => this.vex_note = vex_note)
    this.data.currentMessage2.pipe(takeUntil(this.destroyed)).subscribe(pleyer_note => this.pleyer_note = pleyer_note)
    this.data.currentMessage3.pipe(takeUntil(this.destroyed)).subscribe(ytime => this.ytime = ytime)
    this.data.currentMessage4.pipe(takeUntil(this.destroyed)).subscribe(number_of_bar_note => this.number_of_bar_note = number_of_bar_note)
  }


  keyHandler(key: string, lock: boolean) {
    console.log(key);
    const kv = keyMap[key.toLocaleLowerCase()];
    if (lock) this.whit_button_down(kv)
    else this.whit_button_up(kv)
    this.lock = lock;
  }

  @HostListener('window:keydown', ['$event'])//an event called when any keyborde key pressed
  keyDown(event: KeyboardEvent) {
    if (!this.lock)
      this.keyHandler(event.key, true)

  }
  @HostListener('window:keyup', ['$event'])//an event called when any keyborde key relessed
  keyEventup(event: KeyboardEvent) {
    this.keyHandler(event.key, false)

  }

  destroyed = new Subject<boolean>();

  ngOnDestroy() {
    this.destroyed.next(true)
    this.destroyed.complete()
  }

  get_rendom_data() {
    this.data.currentMessage1.pipe(takeUntil(this.destroyed)).subscribe(vex_note => this.vex_note = vex_note)
    this.data.currentMessage2.pipe(takeUntil(this.destroyed)).subscribe(pleyer_note => this.pleyer_note = pleyer_note)
    this.data.currentMessage3.pipe(takeUntil(this.destroyed)).subscribe(ytime => this.ytime = ytime)
    this.data.currentMessage4.pipe(takeUntil(this.destroyed)).subscribe(number_of_bar_note => this.number_of_bar_note = number_of_bar_note)

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
        this.ytime_num = Math.floor((((this.notes_time.length - 1) * 9 * Math.random())) / 9);//generat random number from 0 to this.notes_time.length-1  that represent the note time [1,0.5,0.25,0.125.0.0625]
        if (this.bar_time + this.note_time[this.ytime_num] <= 1) {
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
        do {
          this.ynum[index] = Math.floor((((notes.length - 1) * 9 * Math.random())) / 9);//generat random number from 0 to this.notes.length-1 that represent the note value[a,b,c,d,e,f,g]
        }
        while (Math.abs(this.ynum[index] - this.ynum[index - 1]) > this.smothness)//accept the value if it fit wiith the requierd smothness
        this.vex_note[index + bar * 16] = notes[this.ynum[index]];
        this.pleyer_note[index + bar * 16] = notes_play[this.ynum[index]];
      }
    }
  }
  // bars_generator() //fill the arrays with random patren of notes
  // {
  //   //intitalis the array to null valus
  //   this.vex_note = Array(128).fill(null);
  //   this.number_of_bar_note = Array(8).fill(null);
  //   this.ytime = Array(128).fill(null);

  //   for (let bar = 0; bar < 8; bar++) //scaning 8 bars 4 on the first line and 4 on the second
  //   {
  //     this.bar_time = 0; 
  //     //notes time generat
  //     for (let index = 0; index < 1000; index++)//randomation process. that is limited by 1000 try, to fit with tha rimaining bar time  
  //     {
  //       this.ytime_num = Math.floor((((this.notes_time.length-1) * 9 * Math.random())) / 9);//generat random number from 0 to this.notes_time.length-1  that represent the note time [1,0.5,0.25,0.125.0.0625]
  //       if (this.bar_time + this.note_time[this.ytime_num] <= 1)
  //       {
  //         this.bar_time += this.note_time[this.ytime_num];
  //         this.ytime[this.number_of_bar_note[bar] + bar * 16] = this.notes_time[this.ytime_num];
  //         this.number_of_bar_note[bar]++;
  //         if (this.bar_time == 1) //break the randomation loop whe complete the bar time to 1
  //           break;
  //       }
  //     }
  //     //note value generat
  //     for (let index = 0; index < this.number_of_bar_note[bar]; index++) //scanning every note time that generat on the last step
  //     {
  //       do 
  //       {
  //         this.ynum[index] = Math.floor((((this.notes.length-1) * 9 * Math.random())) / 9);//generat random number from 0 to this.notes.length-1 that represent the note value[a,b,c,d,e,f,g]
  //       }
  //       while (Math.abs(this.ynum[index] - this.ynum[index - 1]) > this.smothness)//accept the value if it fit wiith the requierd smothness
  //       this.vex_note[index + bar * 16] = this.notes[this.ynum[index]];
  //       this.pleyer_note[index + bar * 16] = this.notes_play[this.ynum[index]];
  //     }
  //   }
  // }
  rand_generat() {
    this.id = setInterval(() => {
      //the main loop of the program that draw calculate time
      if (this.generate_on) {

        this.timecount += this.time_res;
        this.timecount2 += this.time_res;
        this.total_count += this.time_res;


        this.draw_notes(this.vex_note, this.ytime, this.number_of_bar_note, this.bar_number, this.xblue, this.xblue2);//draw function

        if (this.timecount >= ((1 / parseInt(this.ytime[this.xblue + 16 * this.bar_number])) * 240000) / this.noteime) {
          this.playnote(this.pleyer_note[this.xblue + 16 * this.bar_number]);// play the note sound
          this.timecount = 0;
          this.xblue++;
          if (this.xblue >= this.number_of_bar_note[this.bar_number])// check if the bar end the notes
          {
            this.xblue--;
            this.bar1_end = true;
          }
        }
        if (this.timecount2 >= (1 / parseInt(this.ytime[this.xblue2 + 16 * (this.bar_number + 4)])) * 240000 / this.noteime) {
          this.playnote(this.pleyer_note[this.xblue2 + 16 * (this.bar_number + 4)]);// play the note sound
          this.timecount2 = 0;
          this.xblue2++;
          if (this.xblue2 >= this.number_of_bar_note[this.bar_number + 4]) // check if the bar end the notes
          {
            this.xblue2--;
            this.bar2_end = true;
          }
        }
        if (this.bar2_end && this.bar1_end) {
          this.bar_number++;
          this.bar2_end = false;
          this.bar1_end = false;
          this.xblue = 0;
          this.xblue2 = 0;
          this.timecount2 = 0;
          this.timecount = 0;
        }
        if (this.bar_number > 3) {
          this.bar2_end = false;
          this.bar1_end = false;
          this.xblue = 0;
          this.xblue2 = 0;
          this.bar_number = 0;
          this.total_count = 0;
          // this.bars_generator();
          this.draw_erase();
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
    // this.bars_generator();
    this.draw_notes(this.vex_note, this.ytime, this.number_of_bar_note, 0, 0, 0);
  }
  whit_button_down(button: number) {


    this.w_buttons[button] = 1;
    this.playnote(notes_play[button]);
    this.single_note_place = this.total_count;
    this.down_time = performance.now()
  }
  whit_button_up(button: number) {

    this.w_buttons[button] = 0;
    this.stopnote();

    // single_note_eraser();

    this.up_time = performance.now()
    this.total_time = this.up_time - this.down_time // calculat the pressing time
    this.press_time = Math.round(1 / ((Math.floor(this.total_time) * this.noteime) / 240000))
    console.log(this.press_time.toString())
    if (this.press_time == 1 || this.press_time == 2 || this.press_time == 4 || this.press_time == 8 || this.press_time == 16)
      this.single_note(notes[button], this.single_note_place, this.press_time.toString(), 244.8 / ((240000) / this.noteime));
    else
      this.single_note(notes[8], this.single_note_place, "1", 244.8 / ((240000) / this.noteime));

    console.log("white number : " + button + " time= " + this.total_time)
  }
  black_button_down(button: number) {
    this.b_buttons[button] = 1;
    this.down_time = performance.now()
    console.log("black number : " + button)
  }
  black_button_up(button: number) {
    this.b_buttons[button] = 0;
    this.up_time = performance.now()
    this.total_time = this.up_time - this.down_time
    console.log("black number : " + button + " time= " + this.total_time)
  }
  g_speed(speed: HTMLInputElement, smoth: HTMLInputElement) //used by html to set the speed and the smothness
  {
    this.noteime = parseInt(speed.value);
    this.smothness = parseInt(smoth.value);
  }
  midi_init() {
    if (MIDI_SUPPORT)
      console.log("midi is supported>>> ")
    if (SYSEX)
      console.log("token responsible for system exclusive access")

    window.navigator.requestMIDIAccess()
      .then((midiAccess) => {
        console.log("MIDI Ready!");
        for (let entry of midiAccess.inputs) {
          console.log("MIDI input device: " + entry[1].id)
          entry[1].onmidimessage = this.onMidiMessage;
        }
      })
      .catch((error) => {
        console.log("Error accessing MIDI devices: " + error);
      });
  }

}

