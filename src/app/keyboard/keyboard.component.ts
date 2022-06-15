import { Component, OnInit } from '@angular/core';
import { notes_play } from '../constants';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {

  buttons = notes_play

  w_buttons: any[] = new Array(17);//refer to which button was pressed
  b_buttons: any[] = new Array(17);
  down_time: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  log: { note: string, start: number, end?: number, duration?: number }[] = []

  toggleNote(note: string, state: boolean) {
    console.log(note, ': ', state == true ? 'playing' : 'stopped');
    if (state == true) {
      this.log.push({ note, start: new Date().getTime() })
    }
    else {
      const noteIdx = this.log.findIndex(n => n.note == note && !n.end)
      const end = new Date().getTime()
      this.log[noteIdx].end = end
      this.log[noteIdx].duration = end - this.log[noteIdx].start
    }

  }

  playnote(note: string) {
    //emit event
  }
  stopnote(note: string) {

  }

  whit_button_down(button: number) {
    this.w_buttons[button] = 1;
    this.playnote(notes_play[button]);
    // this.single_note_place = this.total_count;
    this.down_time = performance.now()
  }

  whit_button_up(button: number) {
    const note = '' //represents the button note
    this.w_buttons[button] = 0;
    this.stopnote(note);

    // single_note_eraser();

    //   this.up_time = performance.now()
    //   this.total_time = this.up_time - this.down_time // calculat the pressing time
    //   this.press_time = Math.round(1 / ((Math.floor(this.total_time) * this.noteime) / 240000))
    //   console.log(this.press_time.toString())
    //   if (this.press_time == 1 || this.press_time == 2 || this.press_time == 4 || this.press_time == 8 || this.press_time == 16)
    //     this.single_note(notes[button], this.single_note_place, this.press_time.toString(), 244.8 / ((240000) / this.noteime));
    //   else
    //     this.single_note(notes[8], this.single_note_place, "1", 244.8 / ((240000) / this.noteime));

    //   console.log("white number : " + button + " time= " + this.total_time)
    // }


    // black_button_down(button: number) {
    //   this.b_buttons[button] = 1;
    //   this.down_time = performance.now()
    //   console.log("black number : " + button)
    // }
    // black_button_up(button: number) {
    //   this.b_buttons[button] = 0;
    //   this.up_time = performance.now()
    //   this.total_time = this.up_time - this.down_time
    //   console.log("black number : " + button + " time= " + this.total_time)
    // }
  }


}