import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'reverse',
  pure: false
})
export class ReversePipe implements PipeTransform {

  transform(value: string | any[], ...args): string | any[] {
    if (typeof value === 'string') {
      let res = '';
      for (let i = value.length - 1; i >= 0; i--) {
        res += value[i];
      }
      return res;
    } else {
      return value.reverse();
    }
  }

}
