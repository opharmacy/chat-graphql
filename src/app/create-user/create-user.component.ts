import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUserService } from '../services/create-user.service';

// const createUser = gql`
// mutation ($inputs: UserInput!) {
//   createUser(inputs: $inputs ) {
//     token
//   }
// }

// `;
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {


  constructor(private apollo: Apollo, private _Router: Router, private _CreateUserService: CreateUserService) { }

  ngOnInit(): void {
  }
  error: any;
  createForm = new FormGroup({
    'username': new FormControl(null, Validators.required),
    'password': new FormControl(null, Validators.required)
  })


  create() {
    // const signUpQuery =  this.apollo.mutate({
    //   mutation: createUser,
    //   variables: {
    //     inputs: {
    //       username: this.createForm.controls.username.value,
    //       password: this.createForm.controls.password.value
    //     }
    //   }
    // });


    // signUpQuery.subscribe(
    //   (data) => {
    //     console.log(data);
    //     this._Router.navigate(["/login"]);

    //   },(err)=>{
    //     this.error=err.message
    //     //console.log(err.message)
    //   }
    // )

    this._CreateUserService.createUserSerivces(this.createForm.controls.username.value, this.createForm.controls.password.value).subscribe(
      (data: any) => {
        console.log(data);
        this._Router.navigate(["/login"]);
      }, (err: any) => {
        this.error = err.message
      }
    )
  }
}
