import { createReducer, on } from '@ngrx/store';

import { Task } from 'src/app/services/task/interface/task.interface';
import { getTasksSuccess } from './actions';

export const initialState: ReadonlyArray<Task> = [];

export const tasksReducer = createReducer(
  initialState,
  on(getTasksSuccess, (_state, { tasks }) => tasks),
);