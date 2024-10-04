import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { CreateTaskComponent } from './create-task.component';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

class MockHttpClient { }

describe('CreateTaskComponent', () => {
  let component: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CreateTaskComponent,
      ],
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

    expect(component.taskForm.value).toEqual(taskFormValues);
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

  it('taskDeadline control should have same value that taskDeadline input html', () => {
    const taskDeadlineControl = component.taskForm.get('taskDeadline');
    const taskDeadlineInputHtml = fixture.debugElement.nativeElement.querySelector('#taskDeadline');

    expect(taskDeadlineControl?.value).toEqual(taskDeadlineInputHtml?.value);
    expect(taskDeadlineControl?.errors).toEqual({ required: true });
  });

  it('Should call addPerson method when click on button btnAddPerson', () => {
    const btnAddPerson = fixture.debugElement.nativeElement.querySelector('#btnAddPerson') as HTMLButtonElement;
    const spy = spyOn(component, 'addPerson');

    btnAddPerson.click();

    expect(spy).toHaveBeenCalled();
  });

  it('Should add a person if last person is valid', () => {
    component.people.at(0).patchValue({
      personName: 'person 1',
      personAge: 25,
      personSkills: ['skill 1'],
    });
    component.people.at(0).markAsTouched();
    component.people.at(0).updateValueAndValidity();

    component.addPerson();

    expect(component.people.length).toEqual(2);
  });

  it('Should not add a person if last person is invalid', () => {
    component.people.at(0).patchValue({
      personName: 'person 1',
      personAge: 15,
      personSkills: ['skill 1'],
    });
    component.people.at(0).markAsTouched();
    component.people.at(0).updateValueAndValidity();

    component.addPerson();

    expect(component.people.length).toEqual(1);
    expect(component.people.at(0).get('personAge')?.errors).toEqual({
      min: { min: 18, actual: 15 }
    });
  });

  it('Should call removePerson method when click on button btnRemovePerson', () => {
    const btnRemovePerson = fixture.debugElement.nativeElement.querySelector('#btnRemovePerson') as HTMLButtonElement;
    const spy = spyOn(component, 'removePerson');

    btnRemovePerson.click();

    expect(spy).toHaveBeenCalled();
  });

  it('Should remove a person if people array length is greater than 1', () => {
    component.people.at(0).patchValue({
      personName: 'person 1',
      personAge: 25,
      personSkills: ['skill 1'],
    });
    component.addPerson();
    component.people.at(1).patchValue({
      personName: 'person 2',
      personAge: 30,
      personSkills: ['skill 1'],
    });
    component.removePerson();

    expect(component.people.length).toEqual(1);
  });

  it('Should not remove a person when people array length is equal to 1', () => {
    component.removePerson();

    expect(component.people.length).toEqual(1);
  });
});
