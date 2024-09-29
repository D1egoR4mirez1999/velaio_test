import { Task } from "src/app/services/task/interface/task.interface";
import { tasksReducer } from "./reducer";

export interface State {
  tasks: Task[]
}

export const state = { tasks: tasksReducer }