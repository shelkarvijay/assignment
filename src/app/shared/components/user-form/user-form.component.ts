import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserModel } from '../../models/user.mdel';
import dashboardData from '../../../core/json/dashoardData.json'
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm!: FormGroup;
  userModel!: UserModel;
  dialogData: any;
  maxDate: Date = new Date();

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.dialogData = data;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    this.maxDate = new Date((currentYear - 18), currentMonth, currentDate);
  }

  ngOnInit() {
    this.userModel = (this.dialogData && this.dialogData.rowElement) ? this.dialogData.rowElement : this.dialogData;
    this.createForm();
  }

  createForm() {
    /**
     * Angular reactive form used here
     */
    this.userForm = this.formBuilder.group({
      nameController: [this.userModel.name],
      emailController: [this.userModel.email, [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      genderController: [this.userModel.gender],
      dateController: [this.userModel.date],
      addressController: [this.userModel.address]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {

      /**
       * Get all values from form and ADD/UPDATE to table data
       * using service
       */
      let addUser = {
        name: this.userForm.get('nameController')?.value,
        email: this.userForm.get('emailController')?.value,
        gender: this.userForm.get('genderController')?.value,
        date: this.userForm.get('dateController')?.value,
        address: this.userForm.get('addressController')?.value
      };
      if (this.dialogData.type == 'Add') {
        dashboardData.push(addUser);
      } else if (this.dialogData.type == 'Edit') {
        dashboardData.splice(this.dialogData.indexElement, 1, addUser);
      }
      this.onClose(addUser);
    } else {
      /**
       * IF form is invalid then show message to user
       */
      this._snackBar.open("Please enter all required fields","Done", {
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
      });
    }
  }

  onClose(ele?: UserModel) {
    this.dialogRef.close(ele);
  }

}
