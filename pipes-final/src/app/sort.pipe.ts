import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortpipe',
  pure: false
})
export class SortPipe implements PipeTransform {

  transform<T>(value: T[], comparator: (a: T, b: T) => number): T[] {
    return value.sort(comparator);
  }

}
