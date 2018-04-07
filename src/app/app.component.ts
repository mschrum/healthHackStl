import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  visitors: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/visitor').subscribe(data => {
      this.visitors = data;
    });
  }
}
