import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import dashboardData from '../../core/json/dashoardData.json'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  /** 
   * Here use store data using BehaviorSubject
   */
  private userInfo = new BehaviorSubject({});
  totalUser = this.userInfo.asObservable();
  
  constructor() { }

  setTotalUser(user: any) {
    this.userInfo.next(user);
  }
}
