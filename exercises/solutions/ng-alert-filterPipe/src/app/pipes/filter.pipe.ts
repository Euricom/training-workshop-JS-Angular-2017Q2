import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false,     // default true
})
export class FilterPipe implements PipeTransform  {
  transform(value, filter) {
    return value.filter(item => item.name.includes(filter));
  }
}
