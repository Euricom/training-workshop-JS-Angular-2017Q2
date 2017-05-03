import { Component } from '@angular/core';

@Component({
  selector: 'template-form',
  templateUrl: './templateForm.component.html',
})
export class TemplateFormComponent {
  types: any = [
    'admin',
    'user',
  ];
  model: any;

  constructor() {
    this.model = {
      firstName: 'John',
      lastName: 'Doe',
      type: 'admin',
      IsActive: false,
    };
  }
  submitForm(form: any): void {
    console.log('Form Data: ');
    console.log(form.value);
  }
}
