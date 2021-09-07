import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteUserComponent } from 'src/app/shared/components/delete-user/delete-user.component';
import { UserFormComponent } from 'src/app/shared/components/user-form/user-form.component';
import { UserModel } from 'src/app/shared/models/user.mdel';
import { UserService } from 'src/app/shared/services/user.service';
import dashoardData from '../../core/json/dashoardData.json'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  displayedColumns: string[] = ['select', 'name', 'email', 'gender', 'date', 'address', 'actions'];
  dataSource = new MatTableDataSource<UserModel>();
  userModel: UserModel[] = [];
  checked: boolean = false;
  @ViewChild(MatPaginator) paginator: any;
  @Input() addingUser: any;

  constructor(
    public matDialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userModel = dashoardData;
    this.dataSource.data = this.userModel;

    /** Store update table data to service */
    this.userService.setTotalUser({ users: this.dataSource.data });
  }

  addEditUser(type?: string, element?: UserModel, index?: number) {
    const dialogRef = this.matDialog.open(UserFormComponent,
      {
        width: '500px',
        data: type == 'add' ? { type: 'Add' } : { rowElement: element, indexElement: index, type: 'Edit' }
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      this.userModel = dashoardData;
      this.dataSource.data = this.userModel;
      /** Store update table data to service */
      this.userService.setTotalUser({ users: this.dataSource.data });
    });
  }

  onDelete(element: UserModel) {
    const dialogRef = this.matDialog.open(DeleteUserComponent,
      {
        width: '500px',
        data: element
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        /** 
         * Checking is data is present or not
         * If data is there then remove that perticular element from TABLE
         */
        dashoardData.splice(dashoardData.indexOf(result), 1);
        this.userModel = dashoardData;
        this.dataSource.data = this.userModel;

        /** Store update table data to service */
        this.userService.setTotalUser({ users: this.dataSource.data });
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

