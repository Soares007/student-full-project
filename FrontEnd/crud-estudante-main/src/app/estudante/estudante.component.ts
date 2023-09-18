import { EstudantesService } from './../estudantes.service';
import { Component, OnInit } from '@angular/core';
import { Estudante } from '../estudantes';


@Component({
  selector: 'app-estudante',
  templateUrl: './estudante.component.html',
  styleUrls: ['./estudante.component.css']
})
export class EstudanteComponent implements OnInit {

  estudantes: Estudante[] = [];
  student: Estudante = {} as Estudante;
  isEditing: boolean = false;
  isSubmitted: boolean = false;

  constructor(private EstudantesService: EstudantesService) {
  }

  ngOnInit(): void {
    this.loadEstudantes();
  }

  loadEstudantes() {
    this.EstudantesService.getEstudantes().subscribe({
      next: data => this.estudantes = data
    });
  }

  onCleanEvent() {
    this.student = {} as Estudante;
    this.isSubmitted = false;
    this.isEditing = false;
  }

  onSaveEvent(student: Estudante) {
    if (this.isEditing) {
      this.EstudantesService.update(student).subscribe(
        {
          next: () => {
            this.loadEstudantes();
            this.isEditing = false;
            this.isSubmitted = true;
          }
        }
      );
    } else {
      this.EstudantesService.save(student).subscribe(
        {
          next: data => {
            this.estudantes.push(data);
            this.isSubmitted = false;
          }
        }
      );
    }
  }

  edit(estudante: Estudante) {
    this.student = estudante;
    this.isEditing = true;
  }

  delete(student: Estudante) {
    this.EstudantesService.delete(student).subscribe(
      {
        next: () => this.loadEstudantes()
      }
    );
  }
}
