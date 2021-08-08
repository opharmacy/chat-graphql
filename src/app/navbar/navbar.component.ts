import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import jwt_decode from "jwt-decode";
import { LoginServiceService } from '../services/login-service.service';
import { LogoutService } from '../services/logout.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  decoded: any;
  constructor(private apollo: Apollo, private _Router: Router, private logoutService: LogoutService) { }
  token: any;
  isLoggedIn: boolean = false;
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token != undefined || this.token != null) {
      this.isLoggedIn = true;
      this.decoded = jwt_decode(this.token);
    }
    else {
      this.isLoggedIn = false;
    }

  }

  logout() {
    this.logoutService.logoutService().subscribe(
      (data: any) => {
        console.log(data);
        this.isLoggedIn = false;
        localStorage.removeItem('token');
        this._Router.navigate(["/login"]);
      }
    )
  }
}
