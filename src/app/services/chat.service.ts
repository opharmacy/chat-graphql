import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
const getAllUsers = gql`
query getusers ($token: String){
  users(token: $token)
}
`



const startConversion = gql`
mutation MyMutation ($messageInput: MessageInputData){
  sendMessage(messageInput: $messageInput){
    message
  }
}
`

const getConversions = gql`
query getConversations($token:String){
  getConversations(token:$token){
    _id
    date
    userOne
    userTwo
  }
}
`
const getMessages = gql`
query getAllmessages($token:String,$_id:String) {
  conversation(_id:$_id, token:$token) {
    _id
    date
    userOne
    userTwo
  	messages {
      _id
      message
      author
      date
    }
  }
}

`

const deleteConversion = gql`
mutation MyMutation ($token:String,$conversationId:String){
  
  deleteConversation(conversationId:$conversationId, token:$token) {
    message
  }
}
`

const watchConv = gql`
subscription  messageSubscription($token:String,$conversationId:String)
{
  message(token: $token,conversationId: $conversationId){
    
      _id
      conversationId
      author
      date
      message
    
    }
}
`
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private apollo:Apollo) { }
  getAllUsers(){
    const getAllUsersQuery = this.apollo.query({
      query: getAllUsers,
      variables: {
        token: localStorage.getItem('token')
      }
    });
    return getAllUsersQuery;
  }
  startConver(message:any,targetUser:any){
    const startCon = this.apollo.mutate({
      mutation: startConversion,
      variables: {
        messageInput: {
          message:message , targetUsername: targetUser, token: localStorage.getItem('token')
        }
      }
    });
    return startCon;
  }
  getConver(){
    const getAllConversionsQuery = this.apollo.query({
      query: getConversions,
      variables: {
        token: localStorage.getItem('token')
      }
    })
    return getAllConversionsQuery;
  }


  getMessages(token:any,_id:any){
    
    const getChats = this.apollo.query({
      query: getMessages,
      variables: {
        token: token,
        _id:_id
      }
    });
    return getChats;
  }


  deleteCovn(token:any,id:any){
    const deleteConver = this.apollo.mutate({
      mutation: deleteConversion,
      variables: {
        token: token,
        conversationId: id
      }
    });
    return deleteConver
  }
  getNewMessages(token:any,chatID:any){
    
    const getNewMessages = this.apollo.subscribe({

      query: watchConv,
      variables: {
        token: token,
        conversationId: chatID
      }

    });
    return getNewMessages;
  }
}
