import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { UserPanelListComponent } from './components/userPanelList/userPanelList.component';
import { UserTableListComponent } from './components/userTableList/userTableList.component';
import { UserDetailComponent } from './components/userDetail/userDetail.component';
import { UserService } from './services/userService';

import { UsersResolver } from './services/resolvers/usersResolver';
import { UserResolver } from './services/resolvers/userResolver';

const appRoutes: Routes = [
  { path: 'detail/:id', component: UserDetailComponent },
  { path: 'detail', component: UserDetailComponent },
  { path: 'list', component: UserTableListComponent },
  { path: 'panel', component: UserPanelListComponent, resolve: { users: UsersResolver } },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
];

@NgModule({
    imports: [
        // other modules we depend on
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        // all declared components, directives, pipes, ...
        AppComponent,
        UserComponent,
        UserPanelListComponent,
        UserTableListComponent,
        UserDetailComponent,
    ],
    providers: [
        // all services
        UserService,
        UserResolver,
        UsersResolver
    ],
    bootstrap: [AppComponent], // the root component
})

export class AppModule {
}
