import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputDirective } from './directives/input.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    InputDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  taskForm: FormGroup;
  get personSkills(): FormArray {
    return this.taskForm.get('personSkills') as FormArray;
  }

  constructor(private formBuilder: FormBuilder) {
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
      this.personSkills.push(this.formBuilder.control('', [Validators.required, Validators.minLength(1)]));
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

    // Do something
  }
}
