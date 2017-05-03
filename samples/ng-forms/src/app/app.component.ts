import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms'
import { UserExistValidator } from './userExist.validator';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'app',
  templateUrl: './app.component.reactive.html',
})
export class AppComponent implements OnInit {

  model: any = { type: 'two'};
  userForm: FormGroup;
  types: any = [
    'one',
    'two',
  ]

  constructor(private formBuilder: FormBuilder, private userExistValidator: UserExistValidator) {
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
        'name': [
          // value
          this.model.name,
          // sync validators
          [Validators.required, Validators.minLength(3), Validators.maxLength(20), validEmail],
          // async validators
          [this.userExistValidator.getValidator()],
        ],
        'type': [this.model.type],
    })
  }

  onSubmit(userForm) {
    this.model = this.userForm.value
    console.log('submit', this.model)
  }
}

function validEmail(control) {
    if (control.value) {
        if (control.value.includes('@euri.com')) {
            return null;   // valid
        }
        // invalid
        return {
            'validEmail': 'Email is invalid ',
        }
    }
    return null;  // valid
}

