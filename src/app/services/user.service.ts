import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../types/userTypes';
import { ErrorService } from './error.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  users: Array<IUser> = [];
  private baseUrl: string =
    'https://crudcrud.com/api/5e0c5acaa4ab4441b26d38b5b4189175';

  getUsers() {
    return this.http.get(`${this.baseUrl}/user`).subscribe({
      next: (response: any) => {
        this.users = response;
      },
      error: (error) => {
        this.errorService.set(error.message);
      },
    });
  }
  addUser(payload: IUser) {
    return this.http.post(`${this.baseUrl}/user`, payload).subscribe({
      next: () => {
        this.users.push(payload);
      },
      error: (error) => {
        this.errorService.set(error.message);
      },
    });
  }
  editUser(id: string, payload: IUser, index: number) {
    return this.http.put(`${this.baseUrl}/user/${id}`, payload).subscribe({
      next: () => {
        this.users[index] = { ...payload, _id: id };
      },
      error: (error) => {
        this.errorService.set(error.message);
      },
    });
  }
  deleteUser(id: string, index: number) {
    return this.http.delete(`${this.baseUrl}/user/${id}`).subscribe({
      next: () => {
        this.users.splice(index, 1);
      },
      error: (error) => {
        this.errorService.set(error.message);
      },
    });
  }
}
