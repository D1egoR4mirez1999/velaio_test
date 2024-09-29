import { TestBed } from '@angular/core/testing';
import { NgControl } from '@angular/forms';
import { inject } from '@angular/core';

import { InputDirective } from './input.directive';

class MockNgControl { }

describe('InputDirective', () => {
  let ngControl: NgControl;
  let directive: InputDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        InputDirective,
      ],
      providers: [
        {
          provide: NgControl,
          useClass: MockNgControl,
        }
      ],
    });
    TestBed.runInInjectionContext(() => {
      ngControl = inject(NgControl);
      directive = new InputDirective()
    });
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
