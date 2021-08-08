import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(users: any, text:any): any {
    if(text==undefined){
      return users;

    }
    return users.filter((function(user:any){
      return user.userOne.toLowerCase().includes(text.toLowerCase())||user.userTwo.toLowerCase().includes(text.toLowerCase())
  }))
  }
}
