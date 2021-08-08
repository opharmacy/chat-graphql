import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChatComponent } from './chat/chat.component';
import {AccordionModule} from 'primeng/accordion';     
import {MenuItem} from 'primeng/api';
import { SearchPipe } from './pipe/search.pipe';
@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    LoginComponent,
    NavbarComponent,
    ChatComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AccordionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
