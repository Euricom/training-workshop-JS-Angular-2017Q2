import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// components
import { AppComponent } from './app.component';
import { AlertComponent } from './components/alert/alert.component';

// filters
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
    imports: [
        // other modules we depend on
        BrowserModule,
    ],
    declarations: [
        // all declared components, directives, pipes, ...
        AppComponent,
        AlertComponent,
        FilterPipe,
    ],
    providers: [
        // all services
    ],
    bootstrap: [AppComponent] // the root component
})

export class AppModule {
}
