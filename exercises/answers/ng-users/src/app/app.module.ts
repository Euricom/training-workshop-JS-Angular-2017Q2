import { BrowserModule } from '@angular/platform-browser'
import { HttpModule } from '@angular/http'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { UserComponent } from './components/user/user.component'
import { UserPanelListComponent } from './components/userPanelList/userPanelList.component'
import { UserTableListComponent } from './components/userTableList/userTableList.component'

import { UserService } from './services/userService'

import 'rxjs/Rx'

@NgModule({
    imports: [
        // other modules we depend on
        BrowserModule,
        HttpModule,
    ],
    declarations: [
        // all declared components, directives, pipes, ...
        AppComponent,
        UserComponent,
        UserPanelListComponent,
        UserTableListComponent,
    ],
    providers: [
        // all services
        UserService
    ],
    bootstrap: [AppComponent] // the root component
})

export class AppModule {
}
