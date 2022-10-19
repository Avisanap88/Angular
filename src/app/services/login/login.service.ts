import { HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from 'src/app/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 // BASE_URL = "http://ec2-54-209-125-228.compute-1.amazonaws.com:8083/api/v1/digitalbooks/auth"
   BASE_URL = "http://localhost:8091/author"

   constructor(private http : HttpClient) { }
  public login(user:User){
    return this.http.post<any>(this.BASE_URL+`/login?emailId=${user.emailId}&password=${user.password}`, user).pipe(catchError(this.errorHandler));;
  }
  // public login(user : {emailId : string , password: string})
  // {
  //   return this.http.post<any>(this.BASE_URL+'/login', user);
  // }

  public signup(user:User 
    // emailId : string,
    // authorName : string,
    // // username : string,
    // password : string
  ):Observable<any>{
    console.log(user)
    return this.http.post<any>(this.BASE_URL+'/register', user).pipe(catchError(this.errorHandler));;
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error.message || 'server Error');
  }

  
}
