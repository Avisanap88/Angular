import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { LoginService } from 'src/app/services/login/login.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // user = {
  //   email: "",
  //   name: "",
  //   // username:"",
  //   password:"",
  //   // role:[
  //   //   ""
  //   // ]
  // }
  user:User= new User();
  // constructor() {  }

  constructor(private loginService : LoginService,
    private router: Router, private notification : NotificationsService) { }

  signup(){
    const observable = this.loginService.signup(this.user)
    //   alert("User Registered successfully")
    // },error=>alert("Oppsss...User not Registered successfully"))
    observable.subscribe(
      (response : any) => {
        // alert("User Registered successfully");
        // this.router.navigate(['author']);
        this.router.navigate(['login']);
      },(error) => {
        this.notification.error(error);
        alert("Ooops....User not Registered");
      });
  }

  

  ngOnInit(): void {
  }

}
