import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { CreateTaskComponent } from './create-task.component';
import { TaskService } from 'src/app/services/task/task.service';

describe('CreateTaskComponent', () => {
  let component: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    taskServiceSpy = jasmine.createSpyObj('TaskService', ['saveTask']);

    TestBed.configureTestingModule({
      imports: [
        CreateTaskComponent,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: HttpClient, useValue: httpClientSpy },
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

  it('Should call addSkill method when click on button btnAddSkill', () => {
    const btnAddSkill = fixture.debugElement.nativeElement.querySelector('#btnAddSkill') as HTMLButtonElement;
    const spy = spyOn(component, 'addSkill');

    btnAddSkill.click();

    expect(spy).toHaveBeenCalled();
  });

  it('Should add a person skill when last person skill is valid', () => {
    component.people.at(0).patchValue({
      personName: 'person 1',
      personAge: 25,
      personSkills: ['skill 1'],
    });
    component.addSkill(component.people.at(0));
    const personSkills = component.people.at(0).get('personSkills') as FormArray<FormControl>;

    expect(personSkills.length).toEqual(2);
  });

  it('Should not add a person skill when last person skill is invalid', () => {
    component.people.at(0).patchValue({
      personName: 'person 1',
      personAge: 25,
      personSkills: [''],
    });
    component.addSkill(component.people.at(0));
    const personSkills = component.people.at(0).get('personSkills') as FormArray<FormControl>;

    expect(personSkills.length).toEqual(1);
  });

  it('Should remove a person skill when person skill array is greather than 1', () => {
    component.people.at(0).patchValue({
      personName: 'person 1',
      personAge: 25,
      personSkills: ['Skill 1'],
    });
    component.addSkill(component.people.at(0));
    const personSkills = component.people.at(0).get('personSkills') as FormArray<FormControl>;

    expect(personSkills.length).toEqual(2);

    component.removeSkill(component.people.at(0), 1);

    expect(personSkills.length).toEqual(1);
  });

  it('Should call saveTask method when submit form', () => {
    const taskFormHtml = fixture.debugElement.nativeElement.querySelector('#taskForm') as HTMLFormElement;
    const spy = spyOn(component, 'saveTask');

    taskFormHtml.dispatchEvent(new Event('submit'));

    expect(spy).toHaveBeenCalled();
  });

  it('Should save a task when form is valid', () => {
    component.taskForm.patchValue({
      taskName: 'task 1',
      taskDeadline: '2024-10-25',
      people: [{
        personName: 'person 1',
        personAge: 18,
        personSkills: ['skill 1'],
      }],
      isComplete: false,
    });
    component.addPerson();
    component.people.at(1).patchValue({
      personName: 'person 2',
      personAge: 18,
      personSkills: ['skill 1'],
    });

    expect(component.taskForm.valid).toBeTrue();
    expect(component.people.length).toBe(2);

    httpClientSpy.post.and.returnValue(of(component.taskForm.value));
    taskServiceSpy.saveTask.and.returnValue(of(component.taskForm.value));

    component.saveTask();

    taskServiceSpy.saveTask(component.taskForm.value).subscribe({
      next: () => {
        expect(httpClientSpy.post).toHaveBeenCalled();
        expect(taskServiceSpy.saveTask).toHaveBeenCalledOnceWith(component.taskForm.value);
        expect(component.taskForm.invalid).toBeTrue();
        expect(component.people.length).toBe(1);
      },
    });
  });

  it('Should not save a task if form is invalid', () => {
    component.taskForm.patchValue({
      taskName: '',
      taskDeadline: '',
      people: [{
        personName: '',
        personAge: 0,
        personSkills: [''],
      }],
      isComplete: false,
    });

    component.saveTask();

    expect(component.taskForm.invalid);
    expect(httpClientSpy.post).not.toHaveBeenCalled();
    expect(taskServiceSpy.saveTask).not.toHaveBeenCalled();
  });
});
