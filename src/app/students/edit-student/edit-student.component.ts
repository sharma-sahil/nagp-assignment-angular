import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/shared/constants/app-constants';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  readonly viewTypeEdit = AppConstants.VIEW_TYPE_EDIT;

  studentId: number;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.studentId = this.route.snapshot.params.id;
  }

}
