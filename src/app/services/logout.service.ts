import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
const logoutQl=gql`
mutation($token:String! ) {
  logout(token:$token ) {
    message
  }
}
`;
@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private apollo:Apollo) { }
logoutService(){
  const logout =  this.apollo.mutate({
    mutation: logoutQl,
    variables: {
      token:localStorage.getItem('token')
    }
  });
return logout;
}
}
