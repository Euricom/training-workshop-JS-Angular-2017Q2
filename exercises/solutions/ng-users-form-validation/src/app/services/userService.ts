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

  getAll(): Observable<User[]> {
    console.log('getAll');
    return this.http.get('/api/users')
      .map((res: Response) => res.json())
      .map(data => data.users.map(item => new User(item)))
      .do(users => console.log('get result', users))
      .catch(this.handleError);
  }

  getById(id): Observable<User> {
    console.log('getById', id);
    return this.http.get(`/api/users/${id}`)
      .map((res: Response) => res.json())
      .map(data => new User(data))
      .do(user => console.log('get result', user))
      .catch(this.handleError);
  }

  save(user: User): Observable<User> {
    console.log('save', user);
    if (user.id) {
      return this.http.put(`/api/users/${user.id}`, user)
        .map((res: Response) => res.json())
        .map(resource => new User(resource))
        .do(updatedUser => console.log('put result', updatedUser))
        .catch(this.handleError);
    } else {
      return this.http.post(`/api/users`, user)
        .map((res: Response) => res.json())
        .map(resource => new User(resource))
        .do(updatedUser => console.log('post result', updatedUser))
        .catch(this.handleError);
    }
  }

  delete(user: User): Observable<User> {
    console.log('delete', user);
    return this.http.delete(`/api/users/${user.id}`)
        .map((res: Response) => res.json())
        .map(resource => new User(resource))
        .do(deletedUser => console.log('delete result', deletedUser))
        .catch(this.handleError);
  }

  handleError(errorRes: Response) {
    console.log('ERROR: ', errorRes.statusText);
    return Observable.throw('Server Error');
  }
}
