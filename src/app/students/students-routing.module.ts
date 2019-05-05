import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentsHomeComponent } from './students-home/students-home.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { ViewStudentsComponent } from './view-students/view-students.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';

const routes: Routes = [
  {
    path: '', component: StudentsHomeComponent,
    children: [
      { path: 'addStudent', component: AddStudentComponent },
      { path: 'students', component: ViewStudentsComponent },
      { path: 'editStudent/:id', component: EditStudentComponent },
      { path: 'viewStudent/:id', component: ViewStudentComponent },
      { path: '', redirectTo: 'addStudent', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
