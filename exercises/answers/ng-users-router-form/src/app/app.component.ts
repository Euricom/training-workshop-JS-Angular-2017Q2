// app.component.ts
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
      .active-link {
          background-color: lightgray
      }
  `],
})
export class AppComponent {
  title = 'app works!';
}
