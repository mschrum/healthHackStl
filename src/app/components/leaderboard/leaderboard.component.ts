import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Visitor } from './../../../classes/visitor';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LeaderboardComponent implements OnInit {

  visitors: Visitor[];

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/visitor').subscribe((data: Visitor[]) => {
      this.visitors = data;
      this.visitors.sort(
        function(a, b) {return (a.visits.length > b.visits.length) ? 1 : ((b.visits.length > a.visits.length) ? -1 : 0); });
      this.visitors.reverse();
    });
  }

}
