import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './components/app-landing/app.component';
import { AppRoutingModule } from './modules/app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { VisitorLogComponent } from './components/visitor-log/visitor-log.component';
import { NewLogComponent } from './components/new-log/new-log.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { VisitorService } from './services/visitor.service';
import { Http } from '@angular/http';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VisitorLogComponent,
    NewLogComponent,
    LeaderboardComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    VisitorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
