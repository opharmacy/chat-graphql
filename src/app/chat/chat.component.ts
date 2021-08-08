import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import jwt_decode from "jwt-decode";
import { ChatService } from '../services/chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  allUsers: any;
  allConversions: any[] = [];
  chatID: any = null;
  token: any;
  userTwo: any = null;
  decoded: any;
  allMessages: any[] = [];
  newMessages: any[] = [];
  constructor(private apollo: Apollo, private chatService: ChatService) {
    this.token = localStorage.getItem('token');
    this.decoded = jwt_decode(this.token);
  }


  messageForm = new FormGroup({
    'message': new FormControl(null, Validators.required)
  })
  ngOnInit(): void {


    this.chatService.getAllUsers().subscribe(
      (output: any) => {
        this.allUsers = output.data.users
      }
    )
    this.chatService.getConver().subscribe(
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
      }, (err) => {
        console.log(err.message)
      }
    )
  }

  objectKeys = Object.keys;

  send() {

    this.chatService.startConver(this.messageForm.controls.message.value, this.userTwo).subscribe(
      (data) => {
        console.log(data.data);
        this.allUsers = data.data
      }, (err) => {
        console.log(err.message)
      }
    )

    this.chatService.getNewMessages(this.token, this.chatID).subscribe(
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
    this.chatService.getMessages(this.token, this.chatID).subscribe(
      (outputData: any) => {
        this.allMessages = outputData.data.conversation.messages;
        this.newMessages.push.apply(this.newMessages, outputData.data.conversation.messages)
        console.log(this.newMessages)
      }
    )

  }

  deleteConv(id: any, index: number) {
    this.chatService.deleteCovn(this.token, id).subscribe(
      (outputData: any) => {
        console.log(outputData, index)
        if (index > -1) {
          this.allConversions.splice(index, 1)
        }

      }
    )
  }
}
