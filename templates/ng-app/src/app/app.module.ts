import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SampleComponent } from './components/sample/sample.component';

@NgModule({
    imports: [
        // other modules we depend on
        BrowserModule,
        HttpModule,
    ],
    declarations: [
        // all declared components, directives, pipes, ...
        AppComponent,
        SampleComponent,
    ],
    providers: [
        // all services
    ],
    bootstrap: [AppComponent] // the root component
})

export class AppModule {
}
