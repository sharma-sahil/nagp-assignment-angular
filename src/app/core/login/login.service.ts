import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { AppConstants } from 'src/app/shared/constants/app-constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  public getLoggedInUserDetails(): User {
    return this.getUserFromStorage();
  }

  public setLoggedInUserDetails(user: User) {
    this.setUserInStorage(user);
  }

  public isUserLoggedIn() {
    const user = this.getUserFromStorage();
    return user && user.name;
  }

  private getUserFromStorage(): User {
    const user = localStorage.getItem(AppConstants.SESSION_STORAGE_KEY_USER);
    return JSON.parse(user);
  }

  private setUserInStorage(user: User) {
    localStorage.setItem(AppConstants.SESSION_STORAGE_KEY_USER, JSON.stringify(user));
  }
}
