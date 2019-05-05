import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/shared/constants/app-constants';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

import { DropDownValidators } from 'src/app/shared/validators/dropdown.validator';

import { StudentService } from 'src/app/core/student/student.service';
import { Document } from 'src/app/shared/models/document.model';
import { CheckboxValidators } from 'src/app/shared/validators/checkbox.validator';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  readonly viewTypeCreate = AppConstants.VIEW_TYPE_CREATE;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService
  ) { }


  ngOnInit() {

  }


}
