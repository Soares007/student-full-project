package com.students.studentsbackend.resources.exceptions;

import java.time.Instant;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice
public class ResourceExceptionHandler {
    
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<StandardError>entityNotFoundException(
                                     EntityNotFoundException e,
                                     HttpServletRequest request)
    {
        StandardError error = new StandardError();
        HttpStatus status = HttpStatus.NOT_FOUND;

        error.setTimeStamp(Instant.now());
        error.setStatus(status.value());
        error.setError("Resource not found");
        error.setMessage(e.getMessage());
        error.setPath(request.getRequestURI());
        
        return ResponseEntity.status(status).body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationErrors> validationErrorsException(
                                     MethodArgumentNotValidException e,
                                     HttpServletRequest request)
    {
        ValidationErrors error = new ValidationErrors();
        HttpStatus status = HttpStatus.UNPROCESSABLE_ENTITY;

        error.setTimeStamp(Instant.now());
        error.setStatus(status.value());
        error.setError("Validation Errors");
        error.setMessage(e.getMessage());
        error.setPath(request.getRequestURI());

        e.getBindingResult()
         .getFieldErrors()
         .forEach( err -> error.addError(err.getDefaultMessage()));

        return ResponseEntity.status(status).body(error);
    }
}