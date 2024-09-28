import { Directive } from '@angular/core';

@Directive({
  selector: '[appInput]',
  exportAs: 'appInput',
  standalone: true,
  host: {
    'class': 'input-element',
  }
})
export class InputDirective { }
