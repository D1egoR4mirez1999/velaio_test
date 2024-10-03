import { ComponentFixture, TestBed } from '@angular/core/testing';
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

  it('should initialize taskForm variable', () => {
    const taskForm = component.taskForm;
    const taskFormValues = {
      taskName: '',
      taskDeadline: '',
      people: [{
        personName: '',
        personAge: '',
        personSkills: [''],
      }],
      isComplete: false,
    };
    
    expect(taskForm.value).toEqual(taskFormValues);
  });

  it('Should have 5 inputs in HTML', () => {
    const taskFormElement = fixture.debugElement.nativeElement.querySelector('#taskForm');
    const inputElements = taskFormElement.querySelectorAll('input');
    
    expect(inputElements.length).toEqual(5);
  });

  it('taskName should have same value when initiate', () => {
    const inputTaskNameFormElement = fixture.debugElement.nativeElement.querySelector('#taskName');
    const inputTaskNameFormGroup = component.taskForm.get('taskName');
    
    expect(inputTaskNameFormElement.value).toEqual(inputTaskNameFormGroup?.value);
    expect(inputTaskNameFormGroup?.errors?.['required']).toBeTruthy();
  });
});
