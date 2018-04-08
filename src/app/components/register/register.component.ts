import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Visitor } from './../../../classes/visitor';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  visitor = new Visitor;

  constructor(private route: ActivatedRoute,
    private router: Router, private http: HttpClient,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {}
  registerVisitor() {
    this.authenticationService.setToken(true);
    this.visitor.visits = [];
    this.http.post('/visitor', this.visitor)
    .subscribe(res => {
        const id = res['_id'];
        this.router.navigate(['/visitHistory']);
      }, (err) => {
        console.log(err);
      }
    );
  }

}
