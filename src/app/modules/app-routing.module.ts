import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { VisitorHistoryComponent } from '../components/visitor-history/visitor-history.component';
import { VisitorLogComponent } from '../components/visitor-log/visitor-log.component';
import { LoginComponent } from '../components/login/login.component';
import { LeaderboardComponent } from '../components/leaderboard/leaderboard.component';
import { NewLogComponent } from '../components/new-log/new-log.component';
import { RegisterComponent } from '../components/register/register.component';


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'newLog', component: NewLogComponent },
  { path: 'visitorLog', component: VisitorHistoryComponent},
  { path: 'visitorLog/:id', component: VisitorLogComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
