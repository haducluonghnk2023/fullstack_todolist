package com.example.be_demo_angular.controller;

import com.example.be_demo_angular.model.dto.response.ResponseWrapper;
import com.example.be_demo_angular.model.entity.Todos;
import com.example.be_demo_angular.services.ITodoServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/todos")
public class TodoController {

    @Autowired
    private ITodoServices todoService;

    @GetMapping
    public ResponseEntity<ResponseWrapper<List<Todos>>> getAllTodos() {
        return ok(todoService.findAll());
    }

    @PostMapping
    public ResponseEntity<ResponseWrapper<Todos>> addTodos(@RequestBody Todos todos) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseWrapper.<Todos>builder()
                        .status(HttpStatus.CREATED.name())
                        .code(HttpStatus.CREATED.value())
                        .data(todoService.add(todos))
                        .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseWrapper<Todos>> updateTodos(@PathVariable int id, @RequestBody Todos todos) {
        return ok(todoService.update(id, todos));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodos(@PathVariable int id) {
        todoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private <T> ResponseEntity<ResponseWrapper<T>> ok(T data) {
        return ResponseEntity.ok(ResponseWrapper.<T>builder()
                .status(HttpStatus.OK.name())
                .code(HttpStatus.OK.value())
                .data(data)
                .build());
    }
}
