import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VisitorService {

  visitors: Array<any> = [];

  constructor(public httpClient: HttpClient) {  }

  getVisitors() {
    return this.httpClient.get('http://localhost:8000/api/visitors');
  }

  // UNUSED RIGHT NOW
  // fetchVisitors(): Observable<any> {
  //   return this.httpClient.get('http://localhost:8000/api/visitors').map((res: Response) => {
  //     if (res.status === 0) {
  //       throw new Error(`HTTP request failed. Error status: ${res.status}`);
  //     }
  //     this.visitors = res.json();
  //     console.log(`this.visitors set to: ${this.visitors}`);
  //   });
  // }
}
