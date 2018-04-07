import { Injectable } from '@angular/core';

@Injectable()

export class AuthenticationService {
  public token = false;
  constructor() { }

  getToken() {
    return this.token;
  }

  setToken(value) {
    this.token = value;
  }
}


