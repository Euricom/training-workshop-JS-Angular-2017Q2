import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: true,     // default true
})
export class FilterPipe implements PipeTransform  {
  transform(value) {
    return value.filter(item => item.id > 10);
  }
}
