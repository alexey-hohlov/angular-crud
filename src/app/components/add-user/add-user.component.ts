import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/types/userTypes';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public modalService: ModalService
  ) {}

  submitted: boolean = false;

  addUserForm: FormGroup = this.fb.group({
    firstName: [
      '',
      [Validators.required, Validators.pattern(/^[^\s]+(\s+[^\s]+)*$/)],
    ],
    lastName: [
      '',
      [Validators.required, Validators.pattern(/^[^\s]+(\s+[^\s]+)*$/)],
    ],
    email: ['', [Validators.required, Validators.email]],
    age: ['', [Validators.required, Validators.min(0)]],
    gender: ['male'],
  });

  onSubmit() {
    this.submitted = true;
    if (this.addUserForm.valid) {
      this.userService.addUser(this.addUserForm.value);
      this.modalService.close();
    }
  }
}
