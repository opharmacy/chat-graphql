import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import jwt_decode from "jwt-decode";

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
const deleteConversion=gql`
mutation MyMutation ($token:String,$conversationId:String){
  
  deleteConversation(conversationId:$conversationId, token:$token) {
    message
  }
}
`
const watchConv=gql`
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

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  allUsers: any;
  allConversions:any[]=[];
  chatID: any = null;
  token: any;
  userTwo: any = null;
  decoded: any;
  allMessages:any[]=[];
  newMessages:any[]=[];
  constructor(private apollo: Apollo) {
          this.token = localStorage.getItem('token');
          this.decoded = jwt_decode(this.token);
  }


  messageForm = new FormGroup({
    'message': new FormControl(null, Validators.required)
  })
  ngOnInit(): void {


    const getAllUsersQuery = this.apollo.query({
      query: getAllUsers,
      variables: {
        token: localStorage.getItem('token')
      }
    });

    getAllUsersQuery.subscribe(
      (output: any) => {
        console.log(output.data.users);
        this.allUsers = output.data.users
      }
    )


    const getAllConversionsQuery = this.apollo.query({
      query: getConversions,
      variables: {
        token: localStorage.getItem('token')
      }
    })
    getAllConversionsQuery.subscribe(
      (queryOutput: any) => {

        this.allConversions = queryOutput.data.getConversations
        console.log(this.allConversions)
        // .map((con: any) => {
        //   this.token = localStorage.getItem('token');
        //   this.decoded = jwt_decode(this.token);

        //   const otherUser = con.userOne == this.decoded.username ? con.userTwo : con.userOne
        //   return {
        //     ...con,
        //     otherUser
        //   }
        // })
      },(err)=>{
        console.log(err.message)
      }
    )
  }

  objectKeys = Object.keys;

  send() {
    const startCon = this.apollo.mutate({
      mutation: startConversion,
      variables: {
        messageInput: {
          message: this.messageForm.controls.message.value, targetUsername: this.userTwo, token: localStorage.getItem('token')
        }
      }
    });

    startCon.subscribe(
      (data) => {
        console.log(data.data);
        this.allUsers = data.data
      },(err)=>{
        console.log(err.message)
      }
    )

    
    const getNewMessages = this.apollo.subscribe({
      
      query: watchConv,
      variables:{
        token:this.token,
        conversationId:this.chatID
      }
      
    }).subscribe(
      (outputData: any) => {
        this.newMessages.push(outputData.data.message)
        this.messageForm.reset()
      }
    )


  }
  getChat(id: any, name: any) {
    this.chatID = id;
    this.userTwo = name;
    console.log(id, name)

    const getChats = this.apollo.query({
      query: getMessages,
      variables: {
        token: this.token,
        _id: this.chatID
      }
    });
    getChats.subscribe(
      (outputData: any) => {
        this.allMessages=outputData.data.conversation.messages;
        this.newMessages.push.apply(this.newMessages,outputData.data.conversation.messages)
        console.log(this.newMessages)
      }
    )

  }

  deleteConv(id:any,index:number)
  {
    const deleteConver=this.apollo.mutate({
      mutation:deleteConversion,
      variables:{
        token:this.token,
        conversationId:id
      }
    });
    deleteConver.subscribe(
      (outputData:any)=>{
        console.log(outputData,index)
        if (index > -1) {
          this.allConversions.splice(index,1)
        }

      }
    )
  }
}
