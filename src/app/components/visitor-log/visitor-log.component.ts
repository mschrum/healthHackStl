import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-visitor-log',
  templateUrl: './visitor-log.component.html',
  styleUrls: ['./visitor-log.component.css']
})
export class VisitorLogComponent implements OnInit {

  visitors: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/visitor').subscribe(data => {
      this.visitors = data;
    });
  }
}
