import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/shared/constants/app-constants';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  readonly viewTypeRead = AppConstants.VIEW_TYPE_READONLY;

  studentId: number;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.studentId = this.route.snapshot.params.id;
  }

}
