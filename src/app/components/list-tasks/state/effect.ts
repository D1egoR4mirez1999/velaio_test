import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';

import { getTasks, getTasksError, getTasksSuccess } from './actions';
import { TaskService } from 'src/app/services/task/task.service';

@Injectable()
export class TasksEffects {

  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(getTasks),
    exhaustMap(() => this.taskService.getTasks()
      .pipe(
        map(tasks => (getTasksSuccess({ tasks }))),
        catchError(() => of(getTasksError()))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private taskService: TaskService
  ) {}
}