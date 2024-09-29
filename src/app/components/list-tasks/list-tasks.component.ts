import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  private getTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => this.tasks = tasks,
    });
  }
}
