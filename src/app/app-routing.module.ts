import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { AuthLoggedGuard } from './guards/auth-logged.guard';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'',redirectTo:'chat',pathMatch:'full'},
  {path:'createUser',component:CreateUserComponent,canActivate:[AuthLoggedGuard]},
  {path:'login',component:LoginComponent,canActivate:[AuthLoggedGuard]},
  {path:'chat',component:ChatComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
