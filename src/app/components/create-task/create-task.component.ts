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
  get personSkills(): FormArray {
    return this.taskForm.get('personSkills') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
  ) {
    this.taskForm = this.formBuilder.group({
      taskName: ['', Validators.required],
      taskDeadline: ['', Validators.required],
      personName: ['', [Validators.required, Validators.minLength(5)]],
      personAge: ['', [Validators.required, Validators.min(18)]],
      personSkills: this.formBuilder.array([
        this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
      ], Validators.required),
    });
  }

  addPersonSkill(): void {
    if (this.isLastSkillValid()) {
      this.personSkills.push(this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(1),
        isPersonInvalid(this.personSkills),
      ]));
    }
  }

  private isLastSkillValid(): boolean {
    return !!this.personSkills.controls[this.personSkills.length - 1].value;
  }

  removeSkill(i: number): void {
    if (this.canRemoveSkill()) {
      this.personSkills.removeAt(i);
    }
  }

  private canRemoveSkill(): boolean {
    return this.personSkills.length > 1;
  }

  saveTask(): void {
    if (this.taskForm.invalid) {
      return;
    }

    this.taskService.saveTask(this.taskForm.value).subscribe({
      next: (resp) => {
        this.taskForm.reset();
      }
    });
  }
}
