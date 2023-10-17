import { Student } from '../students';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnChanges {

  @Input()
  student: Student = {} as Student;

  @Output()
  saveEvent = new EventEmitter<Student>();

  @Output()
  cleanEvent = new EventEmitter<void>();

 formGroupStudent: FormGroup;
 submitted: boolean = false;
  constructor(private formBuilder: FormBuilder

  ) {
    this.formGroupStudent = formBuilder.group({
      id:[],
      name: ['', Validators.required],
      school_class: ['', Validators.required],
      cpf: ['', Validators.required],
      semester: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.student.id){
      this.formGroupStudent.setValue(this.student);
    }
  }

  save() {
    this.submitted = true;
    if (this.formGroupStudent.valid) {
      this.saveEvent.emit(this.formGroupStudent.value);
      this.formGroupStudent.reset();
      this.submitted = false;
    }
  }

  clear() {
    this.cleanEvent.emit();
    this.formGroupStudent.reset();
    this.submitted = false;
  }

  get name(): any {
    return this.formGroupStudent.get("name");
  }
  get school_class(): any {
    return this.formGroupStudent.get("school_class");
  }
  get cpf(): any {
    return this.formGroupStudent.get("cpf");
  }
  get semester(): any {
    return this.formGroupStudent.get("semester");
  }
}
