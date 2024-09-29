import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { isPersonInvalid } from 'src/app/helpers/custom-validators';

import { InputDirective } from 'src/app/directives/input/input.directive';
import { ButtonDirective } from 'src/app/directives/button/button.directive';

import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    CommonModule,
    InputDirective,
    ButtonDirective,
    ReactiveFormsModule,
  ],
  providers: [TaskService],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  taskForm: FormGroup;
  get people(): FormArray<FormGroup> {
    return this.taskForm.get('people') as FormArray<FormGroup>;
  }

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
  ) {
    this.taskForm = this.taskFormGroup();
  }

  private taskFormGroup(): FormGroup {
    return this.formBuilder.group({
      taskName: ['', Validators.required],
      taskDeadline: ['', Validators.required],
      people: this.formBuilder.array([
        this.personFormGroup(),
      ]),
      isComplete: [false],
    });
  }
  
  private personFormGroup(): FormGroup {
    return this.formBuilder.group({
      personName: ['', [Validators.required, Validators.minLength(5)]],
      personAge: ['', [Validators.required, Validators.min(18)]],
      personSkills: this.formBuilder.array([
        this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
      ], Validators.required),
    })
  }

  addPerson(): void {
    if (this.isLastPersonValid()) {
      this.people.push(this.personFormGroup());
    }
  }

  private isLastPersonValid(): boolean {
    return this.people.controls[this.people.controls.length - 1].valid;
  }

  removePerson(): void {
    if (this.canRemovePerson()) {
      this.people.removeAt(this.people.controls.length - 1);
    }
  }

  private canRemovePerson(): boolean {
    return this.people.controls.length > 1;
  }

  getPersonSkills(person: FormGroup): FormArray {
    return person.get('personSkills') as FormArray;
  }

  addPersonSkill(person: FormGroup): void {
    const skills = person.get('personSkills') as FormArray;

    if (this.isLastSkillValid(skills)) {
      skills.push(this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(1),
        isPersonInvalid(skills),
      ]));
    }
  }

  private isLastSkillValid(skills: FormArray): boolean {
    return !!skills.controls[skills.length - 1].value;
  }

  removeSkill(person: FormGroup, i: number): void {
    const skills = person.get('personSkills') as FormArray;

    if (this.canRemoveSkill(skills)) {
      skills.removeAt(i);
    }
  }

  private canRemoveSkill(skills: FormArray): boolean {
    return skills.length > 1;
  }

  saveTask(): void {
    if (this.taskForm.invalid) {
      return;
    }

    this.taskService.saveTask(this.taskForm.value).subscribe({
      next: (resp) => {
        this.taskForm.reset(this.taskFormGroup());
      }
    });
  }
}
