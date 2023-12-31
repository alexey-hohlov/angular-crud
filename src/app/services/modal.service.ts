import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor() {}

  isOpen: boolean = false;

  open() {
    this.isOpen = true;
  }
  close() {
    this.isOpen = false;
  }
}
