import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ReactiveFormComponent } from './components/reactiveForm/reactiveForm.component';
import { TemplateFormComponent } from './components/templateForm/templateForm.component';
import { ValidationFormComponent } from './components/validationForm/validationForm.component';

import { UserExistValidator } from './services/validators/userExist.validator';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,          // for template based forms
        ReactiveFormsModule,  // for model/reactive based forms
    ],
    declarations: [
        // all declared components, directives, pipes, ...
        AppComponent,
        ReactiveFormComponent,
        TemplateFormComponent,
        ValidationFormComponent,
    ],
    providers: [
        // all services
        UserExistValidator,
    ],
    bootstrap: [AppComponent] // the root component
})

export class AppModule {
}
