import { Component } from '@angular/core'

@Component({
  selector: 'app',
  template: `
    <form (ngSubmit)="onSubmit()" #theForm="ngForm" novalidate>
      <div class="form-group">
          <label for="name">Name</label>

          <input type="text" id="name" class="form-control"
                required minlength="4" maxlength="24"
                name="name" [(ngModel)]="model.name"
                #name="ngModel" >

          <div *ngIf="name.errors && (name.dirty || name.touched)"
              class="alert alert-danger">
              <div [hidden]="!name.errors.required">
                Name is required
              </div>
              <div [hidden]="!name.errors.minlength">
                Name must be at least 4 characters long.
              </div>
              <div [hidden]="!name.errors.maxlength">
                Name cannot be more than 24 characters long.
              </div>
          </div>
      </div>
      <button type="submit" class="btn btn-success"
                [disabled]="!theForm.form.valid">Submit</button>
    </form>
  `,
  styles: [`
    .ng-valid[required]  {
      border-left: 5px solid #42A948; /* green */
    }
    .ng-invalid:not(form)  {
      border-left: 5px solid #a94442; /* red */
    }
  `]
})
export class AppComponent {
  title = 'app works!'
  model: any = {}
  types: any = [
    'one',
    'two',
  ]

  onSubmit() {
    console.log('submit', this.model)
  }

}
