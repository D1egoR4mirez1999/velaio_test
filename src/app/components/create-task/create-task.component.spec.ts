import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { CreateTaskComponent } from './create-task.component';

class MockHttpClient { }

describe('CreateTaskComponent', () => {
  let component: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateTaskComponent],
      providers: [
        {
          provide: HttpClient,
          useClass: MockHttpClient,
        },
      ]
    });

    fixture = TestBed.createComponent(CreateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
