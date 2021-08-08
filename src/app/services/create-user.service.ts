import { Injectable } from '@angular/core';
import { Observable } from '@apollo/client/utilities';
import { Apollo, gql } from 'apollo-angular';
const createUser = gql`
mutation ($inputs: UserInput!) {
  createUser(inputs: $inputs ) {
    token
  }
}

`;
@Injectable({
  providedIn: 'root'
})

export class CreateUserService {

  constructor(private apollo: Apollo) { }

  createUserSerivces(username: any, password: any)
  {
    const signUpQuery = this.apollo.mutate({
      mutation: createUser,
      variables: {
        inputs: {
          username: username,
          password: password
        }
      }
    });
    return signUpQuery
    // signUpQuery.subscribe(
    //   (data) => {
    //     console.log(data);
    //     return data
    //   }, (err) => {
    //     // this.error=err.message
    //     return err
    //     //console.log(err.message)
    //   }
    // )
  }
}
