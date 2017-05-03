import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'reactive-form',
  templateUrl: './reactiveForm.component.html',
})
export class ReactiveFormComponent {
  userForm: FormGroup;
  types: any = [
    'admin',
    'user',
  ];
  model: any;

  constructor(formBuilder: FormBuilder) {
    this.model = {
      firstName: 'John',
      lastName: 'Doe',
      type: 'admin',
      IsActive: false,
    };

    this.userForm = formBuilder.group({
      firstName: this.model.firstName,
      lastName: this.model.lastName,
      type: this.model.type,
      isActive: this.model.firstName,
    });
  }

  submitForm(value: any): void {
    console.log('Reactive Form Data: ');
    console.log(value);
  }
}
