import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/let';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/delay';

import { User } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(private http: Http) {
  }

  getAll(): Observable<User[]> {
    return this.http.get('/api/users')
      .timeout(2000)
      .retry(3)
      .catch(castError)
      .map((res: Response) => res.json())
      .map(data => data.users.map(item => new User(item)));
  }

  getById(id): Observable<User> {
    return this.http.get(`/api/users/${id}`)
      .let(handleErrorAndRetry)
      .map((res: Response) => res.json())
      .map(data => new User(data));
  }

  save(user: User): Observable<User> {
    if (user.id) {
      return this.http.put(`/api/users/${user.id}`, user)
        .let(handleErrorAndRetry)
        .map((res: Response) => res.json())
        .map(resource => new User(resource));
    } else {
      return this.http.post(`/api/users`, user)
        .let(handleErrorAndRetry)
        .map((res: Response) => res.json())
        .map(resource => new User(resource));
    }
  }

  delete(user: User): Observable<User> {
    return this.http.delete(`/api/users/${user.id}`)
      .let(handleErrorAndRetry)
      .map((res: Response) => res.json())
      .map(resource => new User(resource));
  }
}

function handleErrorAndRetry(obs) {
  return obs
    .timeout(2000)
    .retryWhen(errors => {
      return errors
        .scan((retryCount, err) => {
          if (err.status === 0 && retryCount < 3) {
            return retryCount + 1;
          }
          throw err;
        }, 0)
        .delay(250);
    })
    .catch(castError);
}

function castError(error: Response | any): Observable<string> {
  if (error instanceof Response && error.status > 0) {
    const errMessage = 'Response Error: ' + error.statusText;
    return Observable.throw(errMessage);
  }
  return Observable.throw('Communication Error');
}

