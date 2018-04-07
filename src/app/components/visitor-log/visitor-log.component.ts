import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Visit } from '../../../classes/visit';
import { Visitor } from '../../../classes/visitor';

@Component({
  selector: 'app-visitor-log',
  templateUrl: './visitor-log.component.html',
  styleUrls: ['./visitor-log.component.css']
})
export class VisitorLogComponent implements OnInit {

  visitor = new Visitor;
  // visits = new Array<Visit>();

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/visitor/' + this.route.snapshot.params['id']).subscribe((data: Visitor) => {
      // this.visits = data.visits;
      this.visitor = data;
      this.visitor.visits.sort(function(a, b) {
        return (a.uploaded_date > b.uploaded_date) ? 1 : ((b.uploaded_date > a.uploaded_date) ? -1 : 0); });
      this.visitor.visits.reverse();
    });
  }
}
