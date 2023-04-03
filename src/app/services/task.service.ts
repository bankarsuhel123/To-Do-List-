import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Crud } from '../model/crud';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  serviceUrl: string = ''
  constructor(private http: HttpClient) {
    this.serviceUrl = 'http://localhost:3000/tasks'
  }
  addTask(task: Crud): Observable<Crud> {
    return this.http.post<Crud>(this.serviceUrl, task)
  }
  getTask(): Observable<Crud[]> {
    return this.http.get<Crud[]>(this.serviceUrl)
  }
  deleteTask(task: Crud): Observable<Crud> {
    return this.http.delete<Crud>(this.serviceUrl + '/' + task.id)
  }
  updateTask(task: Crud): Observable<Crud> {
    return this.http.put<Crud>(this.serviceUrl + '/' + task.id, task)
  }
}
