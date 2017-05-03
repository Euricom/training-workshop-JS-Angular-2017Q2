import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        // other modules we depend on
        BrowserModule,
    ],
    declarations: [
        // all declared components, directives, pipes, ...
        AppComponent,
    ],
    providers: [
        // all services
    ],
    bootstrap: [AppComponent] // the root component
})

export class AppModule {
}
