import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ButtonDirective } from 'src/app/directives/button/button.directive';
import { TaskService } from 'src/app/services/task/task.service';
import { Task } from 'src/app/services/task/interface/task.interface';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [
    CommonModule,
    ButtonDirective,
  ],
  providers: [
    TaskService
  ],
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  tasks: Task[] = [];
  tasksForShowing: Task[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getTasks();
  }

  private getTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.tasksForShowing = tasks;
      }
    });
  }

  goToCreateTask(): void {
    this.router.navigate(['create-task']);
  }

  filterByCompletes(): void {
    this.tasksForShowing = this.tasks.filter((task) => task.isComplete);
  }

  filterByPending(): void {
    this.tasksForShowing = this.tasks.filter((task) => !task.isComplete);
  }

  resetFilters(): void {
    this.tasksForShowing = this.tasks;
  }

  completeTask(task: Task): void {
    const taskData = { ...task, isComplete: true };
    this.taskService.completeTask(taskData).subscribe({
      next: () => {
        this.getTasks();
      }
    });
  }
}
