import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { BookService } from 'src/app/services/book/book.service';
import { Book } from 'src/app/book';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  // book = {
  //   title : "",
  //   publisher: "",
  //   category: "",
  //   price : 0.0,
  //   status : false,
  //   content : "",
  //   logo : ""
  // }
  book:Book=new Book();
  constructor(private bookService : BookService, private router: Router, private notification : NotificationsService) {
    if(history.state.book){
      this.book = history.state.book;
    }
  }

  edit(){
    const observable = this.bookService.updateBook(this.book);
    observable.subscribe(
      (response : any) => {
        this.notification.success("Book updated successfully");
        this.router.navigate(['author']);
      },(error) => {
        this.notification.error(error);
      })
  }

  ngOnInit(): void {
  }

}
