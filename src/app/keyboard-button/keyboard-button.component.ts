import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-keyboard-button',
  templateUrl: './keyboard-button.component.html',
  styleUrls: ['./keyboard-button.component.scss']
})
export class KeyboardButtonComponent implements OnInit, OnChanges {

  @Input() name: string = ''
  @Output() playing = new EventEmitter<boolean>()

  mode = new BehaviorSubject<boolean>(false)
  class = ''

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.name) throw new Error("Name is required");

    this.class = this._getButtonColor(this.name)
  }

  ngOnInit(): void {
    this.mode.subscribe(m=> this.playing.next(m))
  }

  private _getButtonColor(name: string): string {
    return name.includes('#') || name.includes('b') ? 'black' : 'white'
  }  
}
