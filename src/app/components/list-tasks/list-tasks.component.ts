import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';

import { ButtonDirective } from 'src/app/directives/button/button.directive';
import { TaskService } from 'src/app/services/task/task.service';
import { Task } from 'src/app/services/task/interface/task.interface';
import { State } from './state/state';
import { getTasks } from './state/actions';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [
    CommonModule,
    ButtonDirective,
    StoreModule,
  ],
  providers: [
    TaskService
  ],
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit, OnDestroy {
  private allTasks: Task[] = [];
  private filteredTasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.filteredTasksSubject.asObservable();
  private subscription = new Subscription;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private store: Store<State>,
  ) { }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.getTasks();
  }

  private getTasks(): void {
    this.store.dispatch(getTasks());

    this.subscription.add(
      this.store.select('tasks').subscribe(tasks => {
        this.allTasks = tasks;
        this.filteredTasksSubject.next(tasks);
      })
    );
  }

  goToCreateTask(): void {
    this.router.navigate(['create-task']);
  }

  filterByCompletes(): void {
    const completedTasks = this.allTasks.filter(task => task.isComplete);
    this.filteredTasksSubject.next(completedTasks);
  }

  filterByPending(): void {
    const pendingTasks = this.allTasks.filter(task => !task.isComplete);
    this.filteredTasksSubject.next(pendingTasks);
  }

  resetFilters(): void {
    this.filteredTasksSubject.next(this.allTasks);
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
