import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  bookList : Array <any> = [];
  constructor(private router : Router, private bookService : BookService, private notification : NotificationsService) { }

  createBook(){
    this.router.navigate(['create-book']);
  }

  ngOnInit(): void {
    const observable = this.bookService.listAllBooksByAuthor();
    observable.subscribe(
      (response : any) => {
        this.bookList = response;
      },(error) => {
        this.notification.error(error);
      }
    )
  }

}
