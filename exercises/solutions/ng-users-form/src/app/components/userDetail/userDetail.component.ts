import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/userService';
import { User } from '../../models/user.model';

@Component({
  selector: 'user-detail',
  templateUrl: './userDetail.component.html',
})

export class UserDetailComponent implements OnInit {
  errorMessage: String;
  userForm: FormGroup;
  user: User = new User();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    ) {}

  ngOnInit() {
    // setup form
    this.userForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(null),
      phone: new FormControl(),
      age: new FormControl(),
      company: new FormControl(),
      address: new FormGroup({
        street: new FormControl(),
        zip: new FormControl(),
        city: new FormControl(),
      }),
    });

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.userService.getById(id)
        .subscribe(user => {
          // store retrieved user for later use
          this.user = user;

          // fill form by user
          this.userForm.patchValue(user);
        });
    }
  }

  onSubmit() {
    // update user by form value
    this.user.updateBy(this.userForm.value);

    // save our user
    this.userService.save(this.user)
      .subscribe(
        success => this.location.back(),
        error => this.errorMessage = error,
      );
  }

  onCancel(event) {
    event.preventDefault();
    this.location.back();
  }

  onDelete(user, event) {
    event.preventDefault();
    this.userService.delete(this.user)
      .subscribe(() => {
        this.location.back();
      });
  }
}
