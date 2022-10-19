import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Book } from 'src/app/book';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  // BASE_URL = "http://ec2-54-209-125-228.compute-1.amazonaws.com:8083"
  BASE_URL = "http://localhost:8083"
  AUTHOR_URL = "http://localhost:8091/author"

  Book_URL="http://localhost:8090/book"
  READER_URL = "http://localhost:8092/reader"
  user = JSON.parse(sessionStorage.getItem("user") || '{}')

  // getAll(){
  //   return this.http.get(this.Book_URL+"/getallbooksforauthor");
  // }
  createBook(book:Book ) {
    // debugger;
    return this.http.post<any>(this.AUTHOR_URL+'/publishbook', book, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem("jwtToken")
      } 
    }).pipe(catchError(this.errorHandler))
  }

  updateBook(book: any) {
    return this.http.put(this.BASE_URL + this.AUTHOR_URL + this.user.id + "/books/" + book.id + "/", book, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem("jwtToken")
      }
    }).pipe(catchError(this.errorHandler))
  }

  search(book:Book) {
    let params = new HttpParams();
    params = params.append("title", book.title);
    params = params.append("authorName",book.authorName);
    params = params.append("publisher", book.publisher);
    params = params.append("date", book.date);
    return this.http.get<any>(this.READER_URL + '/getallbooks', { params: params }).pipe(catchError(this.errorHandler));
    // return this.http.post<any>(this.READER_URL+`/getallbooks?title=${book.title}&author=${book.authorName}&publisher=${book.publisher}&date=${book.date}`, book).pipe(catchError(this.errorHandler));;
  }

  read(id: number) {
    this.user = JSON.parse(sessionStorage.getItem("user") || '{}')
    return this.http.get(this.BASE_URL + this.READER_URL + "/"+ this.user.id + "/books/"+id , {
      headers: {
        Authorization: 'Bearer ' + this.user.accessToken
      }
    }).pipe(catchError(this.errorHandler))
  }

  buyBook(bookId: number){
    this.user = JSON.parse(sessionStorage.getItem("user") || '{}');
    let payment = {
      "readerId" : this.user.id,
      "bookId" : bookId
    }
    return this.http.post(this.BASE_URL+this.READER_URL+"/books/buy",payment,{
      headers: {
        Authorization: 'Bearer ' + this.user.accessToken
      }
    }).pipe(catchError(this.errorHandler))
  }
  
  allPurchases() {
    this.user = JSON.parse(sessionStorage.getItem("user") || '{}')
    return this.http.get(this.BASE_URL + this.READER_URL + "/"+ this.user.id + "/allBooks" , {
      headers: {
        Authorization: 'Bearer ' + this.user.accessToken
      }
    }).pipe(catchError(this.errorHandler))
  }

  listAllBooksByAuthor() {
    return this.http.get(this.BASE_URL + this.AUTHOR_URL + this.user.id + "/books", 
      {
        headers: {
          Authorization: 'Bearer ' + this.user.accessToken
        }
      }
    ).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error.message || 'server Error');
  }
  constructor(private http: HttpClient) { 
  }
  ngOnIt(){
  }
}
