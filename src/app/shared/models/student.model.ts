import { Document } from './document.model';

export class Student {
  id: number;
  name: string;
  studentCategory: string;
  documents: Document[];
  dob: string;
  fatherName: string;
  motherName: string;
  lastClassScore: number;

}
