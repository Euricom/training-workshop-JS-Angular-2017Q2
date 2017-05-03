import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';

@Injectable()
export class UserExistValidator {
  constructor(private http: Http) {
  }

  getValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return new Promise(resolve => {
        if (control.value) {
          // sample with http
          // this.http.get(`/unique/${control.value}`).subscribe(
          //     response => {
          //         if (response.text() === 'true') {
          //             resolve({exists: true});
          //         } else {
          //             resolve(null);
          //         }
          //     },
          //     error => {
          //         console.log(error);
          //     },
          // );

          // simulation: peter@euri.com exist
          setTimeout(() => {
            if (control.value === 'peter@euri.com') {
              resolve({ userExists: true });
            } else {
              resolve(null);
            }
          }, 500);
        }
      });
    };
  }
}
