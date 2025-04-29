import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, NEVER, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Task ,CreateTask} from '../models/task';
import { ApiResponse } from '../helpers/api-response';
import { TaskRequest } from '../models/task-request';
import { SnackBarService } from './utility/snack-bar.service';


@Injectable({
  providedIn: 'root',
})
export class TaskService {

  private apiUrl = environment.apiUrl+'/tasks';  

  constructor(
    private http: HttpClient,
    private snackbar: SnackBarService,
  ) {}

   // Create a task
  create(createTask: CreateTask): Observable<CreateTask> {
    return this.http.post<ApiResponse<CreateTask>>(this.apiUrl, createTask).pipe(
      map((response) => {
        if (response.success) {
          this.snackbar.showInfo(response.message);
          return response.data; 
        } else {
          this.snackbar.showError(response.message);
          throw new Error(response.message);
        }
      }),
      catchError((error) => {
        console.log(error);
        this.snackbar.showError(
          error.statusText ?? `Hmmm, we've encountered an error, please try again.`
        );
        return NEVER;  
      })
    );
  }
  
 // Update a task
  update(id: number, createTask: CreateTask): Observable<CreateTask> {
    return this.http.put<ApiResponse<CreateTask>>(`${this.apiUrl}/${id}`, createTask).pipe(
      map((response) => {
       
        if (response.success) {
          this.snackbar.showInfo(response.message);
          return response.data; 
        } else {
          this.snackbar.showError(response.message);
          throw new Error(response.message);
        }
      }),
      catchError((error) => {
        console.log(error.message);
        this.snackbar.showError(
          error.statusText ?? `Hmmm, we've encountered an error, please try again.`
        );
        return NEVER;  
      })
    );
  }

  // Delete a task
  delete(id: number): Observable<any> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
      
        if (response.success) {
          this.snackbar.showInfo(response.message); 
          return response.data;  
        } else {
          this.snackbar.showError(response.message); 
          throw new Error(response.message); 
        }
      }),
      catchError((error) => {
        console.log(error.message);
        this.snackbar.showError(
          error.statusText ?? `Hmmm, we've encountered an error, please try again.`
        );
        return NEVER; 
      })
    );
  }
  

  // Get all tasks
  getAll(): Observable<Task[]> {
    return this.http.get<ApiResponse<Task[]>>(this.apiUrl).pipe(
      map((response) => {
      
        if (response.success) {
          return response.data;
        } else {
          throw new Error('Failed to load data');
        }
      }),
      catchError((error) => {
        console.error('Error:', error);
        throw error; 
      })
    );
  }
  

  // Get a single task
  get(id: number): Observable<TaskRequest> {
    return this.http.get<ApiResponse<TaskRequest>>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
       
        if (response.success) {
          return response.data;
        } else {
          throw new Error('Failed to load task');
        }
      }),
      catchError((error) => {
        console.error('Error fetching task:', error);
        throw error; 
      })
    );
  }
  
  
}
