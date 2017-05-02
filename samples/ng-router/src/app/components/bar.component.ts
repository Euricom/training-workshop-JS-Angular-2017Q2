import { Component } from '@angular/core'

@Component({
  selector: 'bar',
  template: `
    <h1>
      Bar: {{title}}
    </h1>
  `,
})
export class BarComponent {
  title = 'The world of components'
}
