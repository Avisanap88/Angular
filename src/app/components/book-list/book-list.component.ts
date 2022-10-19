import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router, UrlSerializer } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  isAuthor= false;
  isLoggedIn = false;
  @Input()
  bookList : Array <any> = [];
  constructor(private router: Router, private bookService : BookService, private notification : NotificationsService) { 
    if(history.state.booksList){
      this.bookList = history.state.booksList;
    }
  }

  edit(book : any){
    let navigationExtras: NavigationExtras = {
      state: {
        book: book
      }
    };
    this.router.navigate(['edit'], navigationExtras);
  }
  // delete(book : any){
  //   let navigationExtras: NavigationExtras = {
  //     state: {
  //       book: book
  //     }
  //   };
  //   this.router.navigate(['edit'], navigationExtras);
  // }

  buyBook(id: any){
    if(!this.isLoggedIn) {
      this.router.navigate(["login"]);
    } else {
      const observable = this.bookService.buyBook(id);
      observable.subscribe(
        (response) => {
          this.notification.success("Payment Successful");
        }, (error) => {
          this.notification.error(error);
        }
      )
    }
  }

  allPurchases(){
    const observable = this.bookService.allPurchases();
    observable.subscribe(
      (response) => {
        let navigationExtras: NavigationExtras = {
          state: {
            booksList: response
          }
        };
        this.router.navigate(['all-purchases'], navigationExtras);
      },(error) => {
        this.notification.error(error);
      })
  }

  ngOnInit(): void { 
    let user = JSON.parse(sessionStorage.getItem("user") || '{}');
    if(user != null && 'roles' in user ){
      this.isLoggedIn = true;
      if('roles' in user &&  user.roles[0] == "ROLE_AUTHOR") {
        this.isAuthor = true;   
      }
    } 
  }
}
