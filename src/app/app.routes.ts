import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'list-tasks',
    loadComponent: () => import('./components/list-tasks/list-tasks.component').then((mod) => mod.ListTasksComponent),
  },
  {
    path: 'create-task',
    loadComponent: () => import('./components/create-task/create-task.component').then((mod) => mod.CreateTaskComponent),
  },
  {
    path: '**', 
    redirectTo: 'list-tasks', 
    pathMatch: 'full'
  },
];
