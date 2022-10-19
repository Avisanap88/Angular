import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-read-book',
  templateUrl: './read-book.component.html',
  styleUrls: ['./read-book.component.css']
})
export class ReadBookComponent implements OnInit {
  @Input()
  book : any = [];
  constructor() { 
    this.book = history.state.book;
  }

  ngOnInit(): void {
  }

}
