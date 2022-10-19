import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { BookService } from 'src/app/services/book/book.service';
import { Book } from 'src/app/book';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent implements OnInit {
  // category: string = "comedy";
  // publisher: string = "xyz";
  // title: string = "book1";
  constructor(private bookService: BookService,
    private router: Router,
    private notification : NotificationsService
  ) { }

bookList : Array <any> = [];
book:Book=new Book();

  search() {
    console.log(this.book)
    const observable = this.bookService.search(this.book);
    observable.subscribe(
      (response: any) => {
        let navigationExtras: NavigationExtras = {
          state: {
            booksList: response
          }
        };
        this.router.navigate(['booksList'], navigationExtras);
      } ,(error) => {
        this.notification.error(error);
      }
    )
  }

 
  ngOnInit(): void {
  }

}
