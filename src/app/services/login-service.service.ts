import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
const loginQl = gql`
query loginquery($userInput: UserInput!) {
  login(userInput: $userInput ) {
    token
  }
}
`;
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private apollo:Apollo) { }
  loginService(username:any,password:any){
    const loginQuery =  this.apollo.query({
      query: loginQl,
      variables: {
        userInput: {
          username: username,
          password: password
        }
      }
    });
    return loginQuery;
  }
}
