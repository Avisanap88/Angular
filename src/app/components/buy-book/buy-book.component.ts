import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-buy-book',
  templateUrl: './buy-book.component.html',
  styleUrls: ['./buy-book.component.css']
})
export class BuyBookComponent implements OnInit {

  constructor(private bookService : BookService, private notification : NotificationsService) { }

  buyBook(bookId: number) {
    const observable = this.bookService.buyBook(bookId);
    observable.subscribe(
      (response) => {
        this.notification.success("Payment Successful");
      }, (error) => {
        this.notification.error(error);
      }
    )
  }
  ngOnInit(): void {
  }

}
