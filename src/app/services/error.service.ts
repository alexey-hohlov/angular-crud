import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor() {}

  message: string = '';

  set(message: string) {
    this.message = message;
  }

  clear() {
    this.message = '';
  }
}
