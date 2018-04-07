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

  visitor = new Visitor;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/visitor/').subscribe((data: Visitor) => {
      this.visitor = data;
    });
  }
}
