package com.students.studentsbackend.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record StudentRequest(
    
    @NotBlank(message = "Nome não pode ser em branco")
    String name,
    
    @Min(value = 0, message = "CPF não pode ser em branco")
    String cpf,

    @NotBlank(message = "Semestre não pode ser em branco")
    String semester,

    @NotBlank(message = "Turma não pode ser em branco")
    String school_class
) {
    
}