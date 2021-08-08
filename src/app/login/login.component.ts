import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

const loginQl = gql`
query loginquery($userInput: UserInput!) {
  login(userInput: $userInput ) {
    token
  }
}
`;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private apollo: Apollo,private _Router:Router) { }
error:any;
  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    'username': new FormControl(null, Validators.required),
    'password': new FormControl(null, Validators.required)
  })


  login() {

    const loginQuery =  this.apollo.query({
      query: loginQl,
      variables: {
        userInput: {
          username: this.loginForm.controls.username.value,
          password: this.loginForm.controls.password.value
        }
      }
    });
    
  loginQuery.subscribe(
    (data:any) => {
       console.log(data.data.login.token);
       localStorage.setItem('token',data.data.login.token);
       this._Router.navigate(["/chat"]);
       
       },(err)=>{
        this.error=err.message
        //console.log(err.message)
      }
  )







  }
  

}
