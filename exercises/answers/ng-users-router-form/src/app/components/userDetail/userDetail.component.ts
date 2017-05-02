import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/userService';
import { User } from '../../models/user.model';

@Component({
  selector: 'user-detail',
  templateUrl: './userDetail.component.html',
  styles: [`
    .ng-valid[required]  {
      border-left: 5px solid #42A948; /* green */
    }
    .ng-invalid:not(form)  {
      border-left: 5px solid #a94442; /* red */
    }
  `],
})

export class UserDetailComponent implements OnInit {
  errorMessage: String;
  submitted: Boolean = false;
  user: User = new User();
  firstName: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.userService.getUser(id)
        .subscribe(user => {
          console.log(user);
          this.user = user;
        });
    }
  }

  onSubmit(event) {
    this.submitted = true;
    if (!event.valid) {
      return;
    }
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
