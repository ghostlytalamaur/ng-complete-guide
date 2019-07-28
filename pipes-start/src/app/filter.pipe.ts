import {Pipe, PipeTransform} from '@angular/core';

type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};
type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];


@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform<T, K extends AllowedNames<T, string>>
  (value: T[], propSelector: (T) => string, filterString: string): T[] {
    console.log('-------');
    console.log('Filtering array...');
    if (value.length === 0 || !filterString) {
      return value;
    }
    const res = [];
    for (const item of value) {
      // console.log(item[prop]);
      // if (this.isSuitable(item, prop, filterString)) {
      if (propSelector(item).includes(filterString)) {
        res.push(item);
      }
    }
    return res;
  }

}

export function prop<T extends Record<K, string>, K extends keyof T>(obj: T, key: K): string {
  return obj[key];
}
