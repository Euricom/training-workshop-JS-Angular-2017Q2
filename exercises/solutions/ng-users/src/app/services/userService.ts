import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(private http: Http) {
  }

  getUsers(): Observable<User[]> {
    console.log('getUsers');
    return this.http.get('http://localhost:3000/api/users')
      .map((res: Response) => res.json())
      .map(data => data.users)
      .do(data => console.log('getUsers', data))
      .catch(this.handleError);
  }

  handleError(errorRes: Response) {
    console.log('ERROR: ', errorRes.statusText);
    return Observable.throw('Server Error');
  }
}
