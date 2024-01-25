import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'format12hours'
})
export class Format12hoursPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    const [hours, minutes] = value.split(':');
    let period = 'AM';
    let hour = parseInt(hours, 10);

    if (hour >= 12) {
      period = 'PM';
      if (hour > 12) {
        hour -= 12;
      }
    }

    return `${hour.toString().padStart(2, '0')}:${minutes} ${period}`;
  }

}
