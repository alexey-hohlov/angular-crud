import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/types/userTypes';

@Component({
  selector: '[app-user]',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(
    private fb: NonNullableFormBuilder,
    private userService: UserService
  ) {}

  @Input() user: IUser;
  @Input() index: number;

  editUserForm!: FormGroup;
  isEditing: boolean = false;

  ngOnInit() {
    this.editUserForm = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      age: [this.user.age, Validators.required],
      gender: ['male'],
    });
  }

  handleEdit() {
    this.isEditing = true;
  }
  handleDelete(id: string, index: number) {
    this.userService.deleteUser(id, index);
  }
  handleCancel() {
    this.isEditing = false;
    this.editUserForm.reset();
  }
  handleSave() {
    if (this.editUserForm.valid) {
      this.userService.editUser(
        this.user._id!,
        this.editUserForm.value,
        this.index
      );
      this.isEditing = false;
    }
  }
}
