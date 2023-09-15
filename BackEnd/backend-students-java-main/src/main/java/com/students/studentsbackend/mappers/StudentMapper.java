package com.students.studentsbackend.mappers;

import com.students.studentsbackend.dtos.StudentRequest;
import com.students.studentsbackend.dtos.StudentResponse;
import com.students.studentsbackend.entities.Student;

public class StudentMapper {

    public static Student toEntity(StudentRequest request) {
        Student student = new Student();
        student.setName(request.name());
        student.setCpf(request.cpf());
        student.setSemester(request.semester());
        student.setSchool_class(request.school_class());
        return student;
    }

    public static StudentResponse toDTO(Student student) {
        return new StudentResponse(
                student.getId(),
                student.getName(),
                student.getCpf(),
                student.getSemester(),
                student.getSchool_class()
        );
    }
}
