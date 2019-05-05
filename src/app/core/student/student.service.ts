import { Injectable } from '@angular/core';
import { StudentCategory } from 'src/app/shared/enums/student-category.enum';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Document } from 'src/app/shared/models/document.model';
import { Student } from 'src/app/shared/models/student.model';
import { AppConstants } from 'src/app/shared/constants/app-constants';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private currentView = new BehaviorSubject<string>('add');

  public currentViewEvent = this.currentView.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  emitCurrentViewEvent(name: string) {
    this.currentView.next(name);
  }

  public getDocumentsByCategory(category: StudentCategory): Observable<Document[]> {

    let url = '';

    switch (category) {
      case 'DOMESTIC':
        url = 'assets/jsons/domestic-student-docs.json';
        break;
      case 'INTERNATIONAL':
        url = 'assets/jsons/international-student-docs.json';
        break;
      default:
        break;
    }

    return this.http.get<Document[]>(url);
  }

  public addStudent(addStudentForm: any) {
    let studentsArr = this.getStudentsFromStorage();
    if (!studentsArr) {
      studentsArr = [];
    }
    let id = 1;
    if (studentsArr.length > 0) {
      id = studentsArr[studentsArr.length - 1].id + 1;
    }

    studentsArr.push(this.getTransformedStudent(id, addStudentForm));
    this.setStudentsInStorage(studentsArr);
  }

  public editStudent(id: number, editStudentForm: any) {

    const students = this.getStudentsFromStorage();
    const studentIndex = students.findIndex(student => student.id === +id);
    const newStudent = this.getTransformedStudent(id, editStudentForm);
    students[studentIndex] = newStudent;

    this.setStudentsInStorage(students);

  }

  public getAllStudents(): Student[] {
    return this.getStudentsFromStorage();
  }

  public getStudentById(id: number): Student {
    const students = this.getStudentsFromStorage();
    return students.filter(a => a.id === +id)[0];
  }

  public deleteStudent(id: number) {
    const students = this.getStudentsFromStorage();
    const student = students.filter(a => a.id === id)[0];
    const index = students.indexOf(student);

    if (index !== -1) {
      students.splice(index, 1);
    }

    this.setStudentsInStorage(students);
  }

  private getTransformedStudent(id: number, addStudentForm: any): Student {
    const student = new Student();
    student.id = id;
    student.motherName = addStudentForm.motherName;
    student.name = addStudentForm.name;
    student.studentCategory = addStudentForm.studentCategory;
    student.lastClassScore = addStudentForm.lastScore;
    student.fatherName = addStudentForm.fatherName;
    student.documents = addStudentForm.documents;
    student.dob = addStudentForm.dob;
    return student;
  }

  private getStudentsFromStorage(): Student[] {
    const students = localStorage.getItem(AppConstants.SESSION_STORAGE_KEY_STUDENTS);
    return JSON.parse(students);
  }

  private setStudentsInStorage(students: Student[]) {
    localStorage.setItem(AppConstants.SESSION_STORAGE_KEY_STUDENTS, JSON.stringify(students));
  }


}


