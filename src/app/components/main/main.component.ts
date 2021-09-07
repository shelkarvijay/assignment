import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  users: any = {};
  totalUsers: number = 0;
  maleUsers: number = 0;
  femaleUsers: number = 0;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    /**
     * Get updated MALE and FEMALE statictical data from service
     */
    this.userService.totalUser.subscribe((ele: any) => {
      let maleLength, femaleLength;
      if (ele.users && ele.users.length) {
        this.totalUsers = ele.users.length;

        /** Use filter method to get only MALE and FEMALE result */
        maleLength = ele.users.filter((item: any) => item.gender == 1);
        femaleLength = ele.users.filter((item: any) => item.gender == 2);
        this.maleUsers = maleLength.length;
        this.femaleUsers = femaleLength.length;
      }
    });
  }

}
