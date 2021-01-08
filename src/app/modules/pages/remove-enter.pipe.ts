import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeEnter',
})
// since this class implements pipetransform then this class has to follow what pipetransform required
export class RemoveEnterPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
