import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { User } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(private http: Http) {
  }

  getUsers(): Observable<User[]> {
    console.log('getUsers');
    return this.http.get('/api/users')
      .map((res: Response) => res.json())
      .map(data => data.users)
      .do(data => console.log('getUsers', data))
      .catch(this.handleError);
  }

  getUser(id): Observable<User> {
    return this.http.get(`/api/users/${id}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  save(user): Observable<User> {
    if (user.id) {
      return this.http.put(`/api/users/${user.id}`, user)
        .map((res: Response) => res.json())
        .catch(this.handleError);
    } else {
      return this.http.post(`/api/users`, user)
        .map((res: Response) => res.json())
        .catch(this.handleError);
    }
  }

  delete(user): Observable<User> {
    return this.http.delete(`/api/users/${user.id}`)
        .map((res: Response) => res.json())
        .catch(this.handleError);
  }

  handleError(errorRes: Response) {
    console.log('ERROR: ', errorRes.statusText);
    return Observable.throw('Server Error');
  }
}
