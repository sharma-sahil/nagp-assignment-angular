import { Component, OnInit, Input } from '@angular/core';
import { AppConstants } from 'src/app/shared/constants/app-constants';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';

import { DropDownValidators } from 'src/app/shared/validators/dropdown.validator';

import { StudentService } from 'src/app/core/student/student.service';
import { Document } from 'src/app/shared/models/document.model';
import { CheckboxValidators } from 'src/app/shared/validators/checkbox.validator';
import { Student } from 'src/app/shared/models/student.model';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  @Input() viewType: string;

  @Input() id: number;

  student: Student;

  readonly domestic = AppConstants.DOMESTIC;
  readonly international = AppConstants.INTERNATIONAL;
  readonly viewTypeCreate = AppConstants.VIEW_TYPE_CREATE;
  readonly viewTypeEdit = AppConstants.VIEW_TYPE_EDIT;
  readonly viewTypeReadOnly = AppConstants.VIEW_TYPE_READONLY;

  addStudentForm: FormGroup;

  showFormErrors = false;

  showAddFormSuccess = false;

  showEditFormSuccess = false;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService
  ) { }

  public get documentDetails(): FormArray {
    return this.addStudentForm.get('documents') as FormArray;
  }

  ngOnInit() {
    if (this.viewType === this.viewTypeCreate) {
      this.initializeNewForm();
    } else if (this.viewType === this.viewTypeEdit) {

      this.initializeOldForm();
    } else if (this.viewType === this.viewTypeReadOnly) {

      this.initializeReadOnlyForm();
    }

  }

  initializeOldForm() {
    this.student = this.studentService.getStudentById(this.id);

    this.addStudentForm = this.formBuilder.group({
      name: [this.student.name, [Validators.required]],
      studentCategory: [this.student.studentCategory, (DropDownValidators.selected(''))],
      documents: this.formBuilder.array([]),
      dob: [this.student.dob, [Validators.required]],
      fatherName: [this.student.fatherName, [Validators.required]],
      motherName: [this.student.motherName, [Validators.required]],
      lastScore: [this.student.lastClassScore, [Validators.required, Validators.min(0), Validators.max(100)]]
    });

    for (const document of this.student.documents) {
      this.documentDetails.push(this.formBuilder.group({
        required: document.required,
        documentName: document.documentName,
        checked: document.checked
      }));
    }

    this.documentDetails.setValidators((CheckboxValidators.selected(this.documentDetails)));
    this.addStudentForm.get('studentCategory').valueChanges.subscribe(value => this.getDocuments(value));
  }

  initializeReadOnlyForm() {

    this.student = this.studentService.getStudentById(this.id);

    this.addStudentForm = this.formBuilder.group({
      name: new FormControl({ value: this.student.name, disabled: true }),
      studentCategory: new FormControl({ value: this.student.studentCategory, disabled: true }),
      documents: this.formBuilder.array([]),
      dob: new FormControl({ value: this.student.dob, disabled: true }),
      fatherName: new FormControl({ value: this.student.fatherName, disabled: true }),
      motherName: new FormControl({ value: this.student.motherName, disabled: true }),
      lastScore: new FormControl({ value: this.student.lastClassScore, disabled: true }),
    });

    for (const document of this.student.documents) {
      this.documentDetails.push(this.formBuilder.group({
        required: document.required,
        documentName: document.documentName,
        checked: new FormControl({ value: document.checked, disabled: true })
      }));
    }

  }

  private initializeNewForm() {
    this.addStudentForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      studentCategory: [this.domestic, (DropDownValidators.selected(''))],
      documents: this.formBuilder.array([]),
      dob: ['', [Validators.required]],
      fatherName: ['', [Validators.required]],
      motherName: ['', [Validators.required]],
      lastScore: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });

    this.getDocuments(this.domestic);

    this.documentDetails.setValidators((CheckboxValidators.selected(this.documentDetails)));
    this.addStudentForm.get('studentCategory').valueChanges.subscribe(value => this.getDocuments(value));
  }


  getDocuments(category) {
    this.studentService.getDocumentsByCategory(category).subscribe(
      data => {
        this.resetFormArray(this.documentDetails);
        this.populateDocumentArray(data);
      }
    );
  }

  populateDocumentArray(documents: Document[]) {

    for (const document of documents) {
      this.documentDetails.push(this.formBuilder.group({
        required: document.required,
        documentName: document.documentName,
        checked: false
      }));
    }
  }

  resetFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }

  submitForm() {
    if (this.addStudentForm.valid) {
      this.showFormErrors = false;
      this.studentService.addStudent(this.addStudentForm.value);
      window.scrollTo(0, 0);
      this.showAddFormSuccess = true;
      this.showFormErrors = false;
      this.initializeNewForm();
    } else {
      this.showFormErrors = true;
      this.showAddFormSuccess = false;
      window.scrollTo(0, 0);
    }
  }

  editStudent() {
    if (this.addStudentForm.valid) {
      this.showFormErrors = false;
      this.studentService.editStudent(this.student.id, this.addStudentForm.value);
      window.scrollTo(0, 0);
      this.showEditFormSuccess = true;
      this.showFormErrors = false;
      this.initializeOldForm();
    } else {
      this.showFormErrors = true;
      this.showEditFormSuccess = false;
      window.scrollTo(0, 0);
    }
  }

}
