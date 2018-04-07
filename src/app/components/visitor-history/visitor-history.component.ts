import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Visit } from '../../../classes/visit';
import { Visitor } from '../../../classes/visitor';

@Component({
  selector: 'app-visitor-history',
  templateUrl: './visitor-history.component.html',
  styleUrls: ['./visitor-history.component.css']
})
export class VisitorHistoryComponent implements OnInit {

  visitors = new Array<Visitor>();
  visits = new Array<Visit>();

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/visitor').subscribe((data: Array<Visitor>) => {
      this.visitors = data;
      console.log(data);
      this.visitors.forEach( visitor => {
        visitor.visits.forEach( visit => {
          this.visits.push(visit);
        });
      });
      this.visits.sort(function(a, b) {
        return (a.uploaded_date > b.uploaded_date) ? 1 : ((b.uploaded_date > a.uploaded_date) ? -1 : 0); });
      console.log(this.visits);
    });


  }
}
