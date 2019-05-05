import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { LoginService } from 'src/app/core/login/login.service';
import { StudentService } from 'src/app/core/student/student.service';

@Component({
  selector: 'app-students-home',
  templateUrl: './students-home.component.html',
  styleUrls: ['./students-home.component.css']
})
export class StudentsHomeComponent implements OnInit, OnDestroy {

  userName: string;

  activeTab = 'add';

  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private loginService: LoginService,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.studentService.currentViewEvent.subscribe(
      value => this.updateCurrentView(value)
    ));

    this.userName = this.loginService.getLoggedInUserDetails().name;

  }

  activateAddStudentView() {
    this.activeTab = 'add';
    this.router.navigate(['admin/addStudent']);

  }

  activateViewStudentsView() {
    this.activeTab = 'view';
    this.router.navigate(['admin/students']);
  }

  updateCurrentView(value) {
    this.activeTab = value;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
