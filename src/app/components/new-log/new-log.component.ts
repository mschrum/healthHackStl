import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Visit } from './../../../classes/visit';
import { Visitor } from './../../../classes/visitor';

import { ActionContext } from '../../models/strategy/action-context';
import { SpeechRecognizerService } from '../../services/speech-recognizer.service';
import { SpeechNotification } from '../../models/speech-notification';
import { SpeechError } from '../../models/speech-error';


@Component({
  selector: 'app-new-log',
  templateUrl: './new-log.component.html',
  styleUrls: ['./new-log.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewLogComponent implements OnInit {

  visit = {user: {name: '', id: ''}, uploaded_date: 0, comments: ''};
  visitor = new Visitor;
  visitors: Visitor[];

  finalTranscript = '';
  recognizing = false;
  notification: string;
  currentLanguage = 'en-US';
  actionContext: ActionContext = new ActionContext();

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient,
    private changeDetector: ChangeDetectorRef, private speechRecognizer: SpeechRecognizerService) { }

  ngOnInit() {
    this.http.get('/visitor').subscribe((data: Visitor[]) => {
      this.visitors = data;
    });
    this.speechRecognizer.initialize(this.currentLanguage);
    this.initRecognition();
    this.notification = null;
  }

  saveVisit(data) {
    const visitDate = Date.now();
    this.visit.comments = this.finalTranscript;
    this.visit.uploaded_date = visitDate;
    const visitorId = this.visit.user.id;
    console.log('User Has ID: ' + this.visit.user.id);
    console.log(this.visit);
    for (let i = 0; i < this.visitors.length; i++) {
      console.log('Testing' + this.visitors[i]._id);
      if (this.visitors[i]._id === <String>visitorId) {
        console.log('USER MATCH!!!!!');
        this.visit.user.name = <string>this.visitors[i].name;
        this.visitor = this.visitors[i];
      }
    }
    console.log(this.visitor);
    this.visitor.visits.push(this.visit);
    this.visit = {user: {name: '', id: ''}, uploaded_date: 0, comments: ''};
    this.http.put('/visitor/' + visitorId, this.visitor)
      .subscribe(res => {
          this.router.navigate(['/newLog']);
        }, (err) => {
          console.log(err);
        }
      );
  }

  startButton(event) {
    if (this.recognizing) {
      this.speechRecognizer.stop();
      return;
    }
    this.speechRecognizer.start(event.timeStamp);
  }

  private initRecognition() {
    this.speechRecognizer.onStart()
      .subscribe(data => {
        this.recognizing = true;
        this.detectChanges();
      });

    this.speechRecognizer.onEnd()
      .subscribe(data => {
        this.recognizing = false;
        this.detectChanges();
        this.notification = null;
      });

    this.speechRecognizer.onResult()
      .subscribe((data: SpeechNotification) => {
        const message = data.content.trim();
        if (data.info === 'finalTranscript' && message.length > 0) {
          this.finalTranscript = `${this.finalTranscript}\n${message}`;
          this.actionContext.processMessage(message, this.currentLanguage);
          this.detectChanges();
        }
      });

    this.speechRecognizer.onError()
      .subscribe(data => {
        switch (data.error) {
          case SpeechError.BLOCKED:
          case SpeechError.NOT_ALLOWED:
            this.notification = `Cannot run the demo.
            Your browser is not authorized to access your microphone. Verify that your browser has access to your microphone and try again.
            `;
            break;
          case SpeechError.NO_SPEECH:
            this.notification = `No speech has been detected. Please try again.`;
            break;
          case SpeechError.NO_MICROPHONE:
            this.notification = `Microphone is not available. Plese verify the connection of your microphone and try again.`;
            break;
          default:
            this.notification = null;
            break;
        }
        this.recognizing = false;
        this.detectChanges();
      });
  }

  detectChanges() {
    this.changeDetector.detectChanges();
  }
}
