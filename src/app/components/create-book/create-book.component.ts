import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { BookService } from 'src/app/services/book/book.service';
import { Book } from 'src/app/book';

@Component({
  selector: 'create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {
 
  book:Book= new Book();
  // book = {
  //   title : "boo1",
  //   publisher: "sun",
  //   category: "comedy",
  //   price : 0.0,
  //   status : false,
  //   content : "Sywfscfoefece",
  //   logo : "book1"
  // }
  errorMsg: string = '';

  create(){
    debugger;
    this.book.active=this.book.active==='false'?0:1;
    const observable = this.bookService.createBook(this.book);
    observable.subscribe(
      (response : any) => {
        console.log(response);
        this.router.navigate(['author']);
        this.notification.success("Book created successfully");
      },(error) => {
        this.notification.error(error);
      })
  }

  constructor(private bookService : BookService, private router: Router, private notification : NotificationsService) { }
   
  ngOnInit(): void {
  }

}

