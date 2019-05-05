import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsHomeComponent } from './students-home/students-home.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { SharedModule } from '../shared/shared.module';
import { ViewStudentsComponent } from './view-students/view-students.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { StudentComponent } from './student/student.component';
import { ViewStudentComponent } from './view-student/view-student.component';

@NgModule({
  declarations: [StudentsHomeComponent, AddStudentComponent, ViewStudentsComponent, EditStudentComponent, StudentComponent, ViewStudentComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule
  ]
})
export class StudentsModule { }
