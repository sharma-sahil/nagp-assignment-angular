import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { LoginService } from 'src/app/core/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName;

  userPassword;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    const user: User = new User();
    user.name = this.userName;
    this.loginService.setLoggedInUserDetails(user);
    this.router.navigate(['/admin']);
  }

}
