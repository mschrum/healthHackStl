import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VisitorService } from './services/visitor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  visitors: any;

  constructor(private visitorService: VisitorService, private http: HttpClient) { }

  ngOnInit() {
    // this.http.get('/visitor').subscribe(data => {
    //   this.visitors = data;
    // });
  }

  requestVisitors() {
    this.visitorService.getVisitors().subscribe((res) => {
      console.log('GOT IT : ' + JSON.stringify(res));
    });
  }

  scan() {
    console.log('derp');
  }
}
