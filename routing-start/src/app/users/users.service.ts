import {BehaviorSubject, Observable} from 'rxjs';
import {User} from './User';
import {map} from 'rxjs/operators';

export class UsersService {

  private users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([
    new User('1', 'Max'),
    new User('2', 'Anna'),
    new User('3', 'Chris')
  ]);

  getUsers(): Observable<User[]> {
    return this.users.pipe(
      map(users => users.slice())
    );
  }
}
