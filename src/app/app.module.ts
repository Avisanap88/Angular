import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HeaderComponent } from './components/header/header.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { SearchBookComponent } from './components/search-book/search-book.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookListComponent } from './components/book-list/book-list.component';
import { AuthorComponent } from './components/author/author.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { ReadBookComponent } from './components/read-book/read-book.component';
import { BuyBookComponent } from './components/buy-book/buy-book.component';
import { PurchasedBooksComponent } from './components/purchased-books/purchased-books.component';


const routes: Route[] = [
  {
    path: 'login', component: LoginComponent,
    children: [
      {
        path: 'signup', component: SignupComponent
      }
    ]
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path : 'create-book', component: CreateBookComponent
  },
  {
    path : 'search-book', component: SearchBookComponent
  },
  {
    path : '', component: SearchBookComponent
  },
  {
    path : 'booksList' , component: BookListComponent
  },
  {
    path : 'author', component:AuthorComponent
  },
  {
    path : 'edit', component:EditBookComponent
  },
  {
    path : 'read' , component: ReadBookComponent
  },
  {
    path : 'all-purchases', component: PurchasedBooksComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    CreateBookComponent,
    SearchBookComponent,
    BookListComponent,
    AuthorComponent,
    EditBookComponent,
    ReadBookComponent,
    BuyBookComponent,
    PurchasedBooksComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule,
    BrowserAnimationsModule, 
    SimpleNotificationsModule.forRoot({ timeOut: 3500})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
