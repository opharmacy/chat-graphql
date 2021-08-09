import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private apollo: Apollo,private _Router:Router,private _loginService:LoginServiceService  ) { }
error:any;
public tokens:any;
  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    'username': new FormControl(null, Validators.required),
    'password': new FormControl(null, Validators.required)
  })


  login() {
    this._loginService.loginService(this.loginForm.controls.username.value,this.loginForm.controls.password.value).subscribe(
      (data:any) => {
         this.tokens=data.data.login.token;
         localStorage.setItem('token',data.data.login.token);
         this._Router.navigate(["/chat"]);
         },(err)=>{
          this.error=err.message
          //console.log(err.message)
        }
    )
  }
}
