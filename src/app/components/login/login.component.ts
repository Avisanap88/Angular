import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { LoginService } from 'src/app/services/login/login.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService : LoginService,
    private router: Router, private notification : NotificationsService
    ) { }
  // user = {
  //   emailId:"",
  //   password:""
  // }

  user:User= new User();
  
  
  login(){
    // console.log("user27",this.user);
    debugger;
    const observable = this.loginService.login(this.user);
    observable.subscribe(
      (response : any) => {
        sessionStorage.setItem("user", JSON.stringify(response));
        sessionStorage.setItem("jwtToken",response.authorDetails.jwtToken);
        // if(response.roles[0] == "ROLE_AUTHOR") {
          this.router.navigate(['author']);
        // } else if (response.roles[0] == "ROLE_READER") {
        //   this.router.navigate(['']);
        // }
      },(error) => {
        this.notification.error(error);
      }
    )
  }
 

ngOnInit() {

}

}
