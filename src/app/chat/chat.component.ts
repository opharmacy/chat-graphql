import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('scrollMe')
  myScrollContainer!: ElementRef;
  deleteArray: any[] = [];
  allUsers: any;
  allConversions: any[] = [];
  chatID: any = null;
  token: any;
  userTwo: any = null;
  decoded: any;
  allMessages: any[] = [];
  newMessages: any[] = [];
  searchText: any = null;
  constructor(private apollo: Apollo, private chatService: ChatService, private _ElementRef: ElementRef) {
    this.token = localStorage.getItem('token');
    this.decoded = jwt_decode(this.token);
  }


  messageForm = new FormGroup({
    'message': new FormControl(null, Validators.required)
  })
  ngOnInit(): void {

    this.chatService.getConver().subscribe(
      (queryOutput: any) => {
        this.allConversions = queryOutput.data.getConversations;
        this.deleteArray = [...this.allConversions];
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

  send() {

    this.chatService.startConver(this.messageForm.controls.message.value, this.userTwo).subscribe(
      (data) => {
      }, (err) => {
        console.log(err.message)
      }
    )
  }



  getChat(id: any, name: any) {
    this.chatID = id;
    this.userTwo = name;
    this.chatService.getMessages(this.token, this.chatID).subscribe(
      (outputData: any) => {
        this.newMessages=[...outputData.data.conversation.messages]
        setTimeout(() => {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        }, 100);
      }
    )


    this.chatService.getNewMessages(this.token, this.chatID).subscribe(
      (outputData: any) => {
        this.newMessages=[...this.newMessages,outputData.data.message]
        setTimeout(() => {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        }, 100);
        this.messageForm.reset()
      }
    )
  }

  deleteConv(id: any, index: number) {
    this.chatService.deleteCovn(this.token, id).subscribe(
      (outputData: any) => {
        if (index > -1) {
          this.deleteArray.splice(index, 1)
        }
      }
    )
  }
  
}
