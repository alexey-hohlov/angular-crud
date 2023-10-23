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
    public userService: UserService
  ) {}

  @Input() user: IUser;
  @Input() index: number;

  editUserForm!: FormGroup;
  isEditing: boolean = false;

  ngOnInit() {
    this.editUserForm = this.fb.group({
      firstName: [
        this.user.firstName,
        [Validators.required, Validators.pattern(/^[^\s]+(\s+[^\s]+)*$/)],
      ],
      lastName: [
        this.user.lastName,
        [Validators.required, Validators.pattern(/^[^\s]+(\s+[^\s]+)*$/)],
      ],
      email: [this.user.email, [Validators.required, Validators.email]],
      age: [this.user.age, [Validators.required, Validators.min(0)]],
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
