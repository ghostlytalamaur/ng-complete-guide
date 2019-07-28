import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
  logged = false;

  isAuthrenticated(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => resolve(this.logged), 100);
    });
  }

  login() {
    this.logged = true;
  }

  logout() {
    this.logged = false;
  }
}
