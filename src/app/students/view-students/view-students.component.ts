import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Student } from 'src/app/shared/models/student.model';
import { StudentService } from 'src/app/core/student/student.service';
import { AppConstants } from 'src/app/shared/constants/app-constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent implements OnInit {

  readonly domestic = AppConstants.DOMESTIC;
  readonly international = AppConstants.INTERNATIONAL;
  readonly all = AppConstants.ALL;

  studentsArrOriginal: Student[] = [];

  studentsArr: Student[] = [];

  showDeleteDialog = false;

  filterStudentForm: FormGroup;

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initializePage();
    this.initializeFilter();
    this.filterStudents();
  }

  initializeFilter() {
    this.filterStudentForm = this.fb.group({
      studentCategory: this.all,
      name: ''
    });
    this.filterStudentForm.valueChanges.subscribe(value => this.filterStudents());
  }

  filterStudents() {
    const nameFilter = this.filterStudentForm.get('name').value;
    const studentCategoryFilter = this.filterStudentForm.get('studentCategory').value;

    if (studentCategoryFilter === this.all) {
      this.studentsArr = this.studentsArrOriginal;
    } else {
      this.studentsArr = this.studentsArrOriginal.filter(s => s.studentCategory === studentCategoryFilter);
    }

    if (!nameFilter) {
      this.studentsArr = this.studentsArr;
    } else {
      this.studentsArr = this.studentsArr.filter(s => s.name.toUpperCase().indexOf(nameFilter.toUpperCase()) !== -1);
    }

  }

  initializePage() {
    this.studentsArrOriginal = this.studentService.getAllStudents();
  }

  private deleteStudent(id: number) {
    this.studentService.deleteStudent(id);
    this.initializePage();
    this.filterStudents();
  }

  onDelete(id: number) {
    if (window.confirm('Are you sure you want to delete this student?')) {
      this.deleteStudent(id);
    }
  }

  viewUser(id: number) {
    this.router.navigate(['/admin/viewStudent/', id]);
    this.studentService.emitCurrentViewEvent('add');
  }

  editUser(id: number) {
    this.router.navigate(['/admin/editStudent/', id]);
    this.studentService.emitCurrentViewEvent('add');
  }

}
