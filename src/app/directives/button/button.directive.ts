import { Directive } from '@angular/core';

@Directive({
  selector: '[appButton]',
  exportAs: 'appButton',
  standalone: true,
  host: {
    'class': 'button-element',
  }
})
export class ButtonDirective { }
