import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserExistValidator } from '../../services/validators/userExist.validator';

// typescript typing stuff
declare interface MyFormGroup extends FormGroup {
  submitted: boolean;
}

function validEmail(control) {
    if (control.value) {
        if (control.value.includes('@euri.com')) {
            return null;   // valid
        }
        // invalid
        return {
            'validEmail': 'Email is invalid ',
        };
    }
    return null;  // valid
}

@Component({
  selector: 'validation-form',
  templateUrl: './validationForm.component.html',
})
export class ValidationFormComponent {
  userForm: MyFormGroup;
  types: any = [
    'admin',
    'user',
  ];
  model: any;

  constructor(formBuilder: FormBuilder, private userExistValidator: UserExistValidator) {
    this.model = {
      type: 'admin',
    };

    this.userForm = formBuilder.group({
      firstName: [this.model.firstName, Validators.required],
      lastName: [this.model.lastName, [
        Validators.minLength(3),
        Validators.required,
      ]],
      // email: [
      //    this.model.email,                         // value
      //    [validEmail],                             // sync validators
      //    [this.userExistValidator.getValidator()]  // async validators
      // ],
      type: this.model.type,
      isActive: this.model.firstName,
    }) as MyFormGroup;
  }

  submitForm(value: any): void {
    this.userForm.submitted = true;
    if (!this.userForm.valid) {
      return;
    }
    console.log('Reactive Form Data: ');
    // copy all fields from form value back to model
    Object.assign(this.model, value);
    console.log('model', this.model);
  }
}
