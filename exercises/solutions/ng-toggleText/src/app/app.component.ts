// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'app works!';
  toggle = true;
  showText = true;

  onToggle() {
    this.toggle = !this.toggle;
  }
  onAlertClosed() {
      console.log('alert closed');
  }
}
