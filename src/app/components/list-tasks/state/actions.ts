import { createAction, props } from "@ngrx/store";
import { Task } from "src/app/services/task/interface/task.interface";

export const getTasks = createAction('[Tasks Component] Get Tasks');
export const getTasksSuccess = createAction('[Tasks Component] Get Tasks Success', props<{ tasks: Task[] }>());
export const getTasksError = createAction('[Tasks Component] Get Tasks Error');
