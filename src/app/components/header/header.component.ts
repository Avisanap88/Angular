import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username:string =""

  constructor(private router : Router) { }
  get isLoggedIn() {
    if(sessionStorage.getItem("user") != null) {
      this.username = JSON.parse(sessionStorage.getItem("user") || "{}").username;
      return true;
    }
    else return false;

  }

  logout() {
    sessionStorage.removeItem("user");
    this.router.navigate(['']);
  }
  ngOnInit(): void {
  }

}
