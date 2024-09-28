import { Directive, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appInput]',
  exportAs: 'appInput',
  standalone: true,
  host: {
    'class': 'input-element',
    '[class.input-invalid]': 'isInvalidControl',
  },
  
})
export class InputDirective {
  ngControl = inject(NgControl, { optional: true, self: true })!;
  get isInvalidControl(): boolean | null {
    return this.ngControl.invalid  && (this.ngControl.dirty || this.ngControl.touched);
  }
}
