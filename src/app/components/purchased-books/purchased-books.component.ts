import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-purchased-books',
  templateUrl: './purchased-books.component.html',
  styleUrls: ['./purchased-books.component.css']
})
export class PurchasedBooksComponent implements OnInit {
  @Input()
  bookList : Array <any> = [];
  constructor(private router : Router , private notification : NotificationsService, private bookService : BookService) { 
    if(history.state.booksList){
      this.bookList = history.state.booksList;
    }
  }

  read(id: any) {
    const observable  = this.bookService.read(id);
    observable.subscribe(
      (response) => {
        let navigationExtras: NavigationExtras = {
          state: {
            book: response
          }
        };
        this.router.navigate(['read'], navigationExtras);
      },(error) => {
        this.notification.error(error);
      })
  }

  ngOnInit(): void {
  }

}
