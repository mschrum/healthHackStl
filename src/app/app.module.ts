import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { VisitorLogComponent } from './components/visitor-log/visitor-log.component';
import { NewLogComponent } from './components/new-log/new-log.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { VisitorService } from './services/visitor.service';
import { Http } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VisitorLogComponent,
    NewLogComponent,
    LeaderboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    VisitorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
