import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Visit } from '../../../classes/visit';
import { Visitor } from '../../../classes/visitor';

@Component({
  selector: 'app-visitor-history',
  templateUrl: './visitor-history.component.html',
  styleUrls: ['./visitor-history.component.css']
})
export class VisitorHistoryComponent implements OnInit, OnDestroy {

  visitors = new Array<Visitor>();
  visits = new Array<Visit>();
  uniqueVisitsArray = new Array<number>();
  handle;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/visitor').subscribe((data: Array<Visitor>) => {
      this.visitors = data;
      console.log(data);
      this.visitors.forEach( visitor => {
        visitor.visits.forEach( visit => {
          this.visits.push(visit);
          this.uniqueVisitsArray.push(visit.uploaded_date);
        });
      });
      this.visits.sort(function(a, b) {
        return (a.uploaded_date > b.uploaded_date) ? 1 : ((b.uploaded_date > a.uploaded_date) ? -1 : 0); });
      this.visits.reverse();
      console.log(this.visits);
    });

    this.startFetcher();
  }


  startFetcher() {
    this.handle = setInterval(() => {
      this.http.get('/visitor').subscribe((data: Array<Visitor>) => {
        if (!data) {
          return null;
        }
        this.visitors = data;
        console.log(data);
        this.visitors.forEach( visitor => {
          visitor.visits.forEach( visit => {
            if (this.uniqueVisitsArray.indexOf(visit.uploaded_date) === -1) {
              this.visits.unshift(visit);
              this.uniqueVisitsArray.push(visit.uploaded_date);
            }
          });
        });
        // this.visits.sort(function(a, b) {
        //   return (a.uploaded_date > b.uploaded_date) ? 1 : ((b.uploaded_date > a.uploaded_date) ? -1 : 0); });
        // this.visits.reverse();
        // console.log(this.visits);
      });
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.handle);
  }
}
