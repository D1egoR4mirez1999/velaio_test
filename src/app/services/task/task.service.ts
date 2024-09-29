import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Task } from './interface/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private URL = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.URL}tasks`);
  }
  
  saveTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.URL}tasks`, task);
  }

  completeTask(task: Task) {
    return this.http.put<Task>(`${this.URL}tasks/${task.id}`, task);
  }
}
