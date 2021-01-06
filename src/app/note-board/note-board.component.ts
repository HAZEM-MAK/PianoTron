import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-note-board',
  templateUrl: './note-board.component.html',
  styleUrls: ['./note-board.component.scss']
})
export class NoteBoardComponent implements OnInit {
 note: number[] = [47,75,103,131,159,187,215,9,9,9,0,6,4,8,9,5];
 notey: number[] = [47,75,103,131,159,187,215];
 notex: number =100;/* from 250 to 1050*/
 f: number=90;
  constructor() { }

  ngOnInit(): void {
   
  }

}
