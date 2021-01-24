import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-note-board',
  templateUrl: './note-board.component.html',
  styleUrls: ['./note-board.component.scss']

})
export class NoteBoardComponent implements OnInit {
  note_counter = 24;
  notes = ["A/4", "B/4", "C/4", "D/4", "E/4", "F/4", "G/4", "R/4", "X/4"];
  vex_note: string[] = [];
  note: number[] = Array(this.note_counter);
  notey = 14;
  notex = 100;/* from 250 to 1050*/
  f = 90;
  xblue = 1;
  yblue = 1;
  ynum: number[] = [];
  generate_on: boolean = false;
  id: any;

  speed: any = document.getElementById("speedm");
  noteime: number = 2000;
  smothness: number = 5;
  boardtime: number = 2000;
  timecount: number = 0;
  time_res: number = 100;



  ngOnInit() {
    this.vexgenertat(true);
  }

  constructor() {

    for (let index = 0; index < this.note_counter + 1; index++) {
      this.ynum[index] = Math.floor(((8 * 10 * Math.random())) / 9);
      this.vex_note[index] = this.notes[this.ynum[index]];
    }
    this.xblue = 0;
    this.yblue = this.ynum[this.xblue];
    this.rand_generat();

  }

  rand_generat() {

    this.id = setInterval(() => {
      this.timecount += this.time_res;
      if (this.generate_on && this.timecount >= this.noteime) {
        this.timecount = 0;
        this.xblue = this.xblue + 1;
        this.yblue = this.ynum[this.xblue];
        if (this.xblue >= this.note_counter) {
          for (let index = 0; index < this.note_counter + 1; index++) {
            do {
              this.ynum[index] = Math.floor(((8 * 10 * Math.random())) / 9);
            } while (Math.abs(this.ynum[index] - this.ynum[index - 1]) > this.smothness)
            this.vex_note[index] = this.notes[this.ynum[index]];
          }
          this.xblue = 0;
          this.yblue = this.ynum[this.xblue];
          this.vexgenertat(false);
        }
      }
    }, this.time_res)

  }
  generate() {
    this.generate_on = !this.generate_on;
  }

  vexgenertat(on_int) {

    test(this.vex_note, on_int);
  }

  g_speed(speed: HTMLInputElement, smoth: HTMLInputElement) {
    this.noteime = parseInt(speed.value);
    this.smothness = parseInt(smoth.value);
  }


}



import Vex from 'vexflow';
const Flow = Vex.Flow;
const { Renderer, Stave, StaveNote, Voice, Formatter } = Flow;

function test(ynote, on_int) {

  //const VF = Vex.Flow;

  // Create an SVG renderer and attach it to the DIV element named "vf".

  const div = document.getElementById("vf") as HTMLElement
  div.innerHTML = "";
  const renderer = new Renderer(div, Renderer.Backends.SVG);

  // Configure the rendering context.
  renderer.resize(1100, 500);
  const context = renderer.getContext();

  context.setFont("Arial", 10).setBackgroundFillStyle("#eed");

  // Create a stave of width 400 at position 10, 40 on the canvas.
  const stave1 = new Stave(20, 40, 300);
  const stave2 = new Stave(320, 40, 250);
  const stave3 = new Stave(570, 40, 250);
  const stave4 = new Stave(820, 40, 250);
  const stave5 = new Stave(20, 125, 300);
  const stave6 = new Stave(320, 125, 250);
  const stave7 = new Stave(570, 125, 250);
  const stave8 = new Stave(820, 125, 250);
  // Add a clef and time signature.

  stave1.addClef("treble").addTimeSignature("4/4");
  stave5.addClef("bass").addTimeSignature("4/4");

  // Connect it to the rendering context and draw!
  stave1.setContext(context).draw();
  stave2.setContext(context).draw();
  stave3.setContext(context).draw();
  stave4.setContext(context).draw();
  stave5.setContext(context).draw();
  stave6.setContext(context).draw();
  stave7.setContext(context).draw();
  stave8.setContext(context).draw();

  var notes1 = [
    new StaveNote({ clef: "treble", keys: [ynote[0]], duration: "4" }),
    new StaveNote({ clef: "treble", keys: [ynote[1]], duration: "4" }),

    new StaveNote({ clef: "treble", keys: [ynote[2]], duration: "4" }),
    new StaveNote({ clef: "treble", keys: [ynote[3]], duration: "4" }),];


  var notes2 = [
    new StaveNote({ clef: "treble", keys: [ynote[4]], duration: "16" }),
    new StaveNote({ clef: "treble", keys: [ynote[5]], duration: "16" }),
    new StaveNote({ clef: "treble", keys: [ynote[6]], duration: "8" }),
    new StaveNote({ clef: "treble", keys: [ynote[7]], duration: "4" }),

    new StaveNote({ clef: "treble", keys: [ynote[8]], duration: "4" }),
    new StaveNote({ clef: "treble", keys: [ynote[9]], duration: "4" }),];
  var notes3 = [
    new StaveNote({ clef: "treble", keys: [ynote[10]], duration: "8" }),
    new StaveNote({ clef: "treble", keys: [ynote[11]], duration: "8" }),
    new StaveNote({ clef: "treble", keys: [ynote[12]], duration: "16" }),
    new StaveNote({ clef: "treble", keys: [ynote[13]], duration: "8" }),

    new StaveNote({ clef: "treble", keys: [ynote[14]], duration: "16" }),
    new StaveNote({ clef: "treble", keys: [ynote[15]], duration: "16" }),
    new StaveNote({ clef: "treble", keys: [ynote[16]], duration: "8" }),
    new StaveNote({ clef: "treble", keys: [ynote[17]], duration: "16" }),

    new StaveNote({ clef: "treble", keys: [ynote[18]], duration: "4" }),];
  var notes4 = [
    new StaveNote({ clef: "treble", keys: [ynote[19]], duration: "16" }),
    new StaveNote({ clef: "treble", keys: [ynote[20]], duration: "8" }),
    new StaveNote({ clef: "treble", keys: [ynote[21]], duration: "4" }),
    new StaveNote({ clef: "treble", keys: [ynote[22]], duration: "16" }),

    new StaveNote({ clef: "treble", keys: [ynote[23]], duration: "4" }),
    new StaveNote({ clef: "treble", keys: [ynote[24]], duration: "4" }),];
  var notes5 = [
    new StaveNote({ clef: "treble", keys: ["b/4"], duration: "8" }),
    new StaveNote({ clef: "treble", keys: ["e/4"], duration: "8" }),

    new StaveNote({ clef: "treble", keys: ["c/4"], duration: "4" }),

    new StaveNote({ clef: "treble", keys: ["b/4"], duration: "8" }),
    new StaveNote({ clef: "treble", keys: ["e/4"], duration: "8" }),

    new StaveNote({ clef: "treble", keys: ["d/4"], duration: "4" }),];
  var notes6 = [
    new StaveNote({ clef: "treble", keys: ["a/4"], duration: "16" }),
    new StaveNote({ clef: "treble", keys: ["d/4"], duration: "4" }),
    new StaveNote({ clef: "treble", keys: ["c/4"], duration: "8" }),
    new StaveNote({ clef: "treble", keys: ["e/4"], duration: "4" }),
    new StaveNote({ clef: "treble", keys: ["d/4"], duration: "16" }),

    new StaveNote({ clef: "treble", keys: ["d/4"], duration: "4" }),];
  var notes7 = [
    new StaveNote({ clef: "treble", keys: ["e/4"], duration: "8" }),
    new StaveNote({ clef: "treble", keys: ["g/4"], duration: "8" }),
    new StaveNote({ clef: "treble", keys: ["b/4"], duration: "16" }),

    new StaveNote({ clef: "treble", keys: ["a/4"], duration: "16" }),
    new StaveNote({ clef: "treble", keys: ["e/4"], duration: "16" }),
    new StaveNote({ clef: "treble", keys: ["e/4"], duration: "8" }),
    new StaveNote({ clef: "treble", keys: ["d/4"], duration: "16" }),
    new StaveNote({ clef: "treble", keys: ["f/4"], duration: "8" }),

    new StaveNote({ clef: "treble", keys: ["d/4"], duration: "4" }),];
  var notes8 = [
    new StaveNote({ clef: "treble", keys: ["d/4"], duration: "4" }),
    new StaveNote({ clef: "treble", keys: ["d/4"], duration: "16" }),
    new StaveNote({ clef: "treble", keys: ["e/4"], duration: "16" }),

    new StaveNote({ clef: "treble", keys: ["e/4"], duration: "4" }),
    new StaveNote({ clef: "treble", keys: ["a/4"], duration: "4" }),
    new StaveNote({ clef: "treble", keys: ["b/4"], duration: "8" }),
  ];

  var voice1 = [new Voice({ num_beats: notes1.length, beat_value: notes1.length }).addTickables(notes1)];
  var voice2 = [new Voice({ num_beats: notes2.length, beat_value: notes2.length }).addTickables(notes2)];
  var voice3 = [new Voice({ num_beats: notes3.length, beat_value: notes3.length }).addTickables(notes3)];
  var voice4 = [new Voice({ num_beats: notes4.length, beat_value: notes4.length }).addTickables(notes4)];
  var voice5 = [new Voice({ num_beats: notes5.length, beat_value: notes5.length }).addTickables(notes5)];
  var voice6 = [new Voice({ num_beats: notes6.length, beat_value: notes6.length }).addTickables(notes6)];
  var voice7 = [new Voice({ num_beats: notes7.length, beat_value: notes7.length }).addTickables(notes7)];
  var voice8 = [new Voice({ num_beats: notes8.length, beat_value: notes8.length }).addTickables(notes8)];
  var formatter1 = new Formatter().joinVoices(voice1).format(voice1, 250);
  var formatter2 = new Formatter().joinVoices(voice2).format(voice2, 250);
  var formatter3 = new Formatter().joinVoices(voice3).format(voice3, 250);
  var formatter4 = new Formatter().joinVoices(voice4).format(voice4, 250);
  var formatter5 = new Formatter().joinVoices(voice5).format(voice5, 250);
  var formatter6 = new Formatter().joinVoices(voice6).format(voice6, 250);
  var formatter7 = new Formatter().joinVoices(voice7).format(voice7, 250);
  var formatter8 = new Formatter().joinVoices(voice8).format(voice8, 250);
  voice1.forEach(function (v) { v.draw(context, stave1); })
  voice2.forEach(function (v) { v.draw(context, stave2); })
  voice3.forEach(function (v) { v.draw(context, stave3); })
  voice4.forEach(function (v) { v.draw(context, stave4); })
  voice5.forEach(function (v) { v.draw(context, stave5); })
  voice6.forEach(function (v) { v.draw(context, stave6); })
  voice7.forEach(function (v) { v.draw(context, stave7); })
  voice8.forEach(function (v) { v.draw(context, stave8); })

  setTimeout(() => {
    notes1[0].setStyle({ fillStyle: "red" });
    voice1.forEach(function (v) { v.draw(context, stave1); })
    
  }, 2000);



}