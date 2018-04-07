import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Visit } from './../../../classes/visit';
import { Visitor } from './../../../classes/visitor';


@Component({
  selector: 'app-new-log',
  templateUrl: './new-log.component.html',
  styleUrls: ['./new-log.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewLogComponent implements OnInit {

  visit = {user: {name: '', id: ''}, uploaded_date: '', comments: ''};
  visitor = new Visitor;
  visitors: Visitor[];

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/visitor').subscribe((data: Visitor[]) => {
      this.visitors = data;
    });
  }

  saveVisit(data) {
    const visitDate = new Date();
    this.visit.uploaded_date = visitDate.toDateString();
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
    this.visit = {user: {name: '', id: ''}, uploaded_date: '', comments: ''};
    this.http.put('/visitor/' + visitorId, this.visitor)
      .subscribe(res => {
          this.router.navigate(['/']);
        }, (err) => {
          console.log(err);
        }
      );
  }
}
