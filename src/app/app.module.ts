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
import { AuthenticationService } from './services/authentication.service';
import { SpeechRecognizerService } from './services/speech-recognizer.service';
import { Http } from '@angular/http';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { VisitorHistoryComponent } from './components/visitor-history/visitor-history.component';
import { WebSpeechComponent } from './components/web-speech/web-speech.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VisitorLogComponent,
    NewLogComponent,
    LeaderboardComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    VisitorHistoryComponent,
    WebSpeechComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    VisitorService,
    AuthenticationService,
    SpeechRecognizerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
