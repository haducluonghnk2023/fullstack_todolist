package com.example.be_demo_angular.services;

import com.example.be_demo_angular.exception.NotFoundException;
import com.example.be_demo_angular.model.entity.Todos;
import com.example.be_demo_angular.repository.ITodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TodoServiceImpl implements ITodoServices {
    @Autowired
    private ITodoRepository todoRepository;

    @Override
    public Todos add(Todos todos) {
        Date now = new Date();
        todos.setCreated(now);
        todos.setUpdated(now);
        return todoRepository.save(todos);
    }

    @Override
    public List<Todos> findAll() {
        return todoRepository.findAllByOrderByUpdatedDescCreatedDesc();
    }

    @Override
    public Todos update(int id, Todos todos) {
        todos.setId(id);
        todos.setUpdated(new Date());
        return todoRepository.findById(id)
                .map(existing -> todoRepository.save(todos))
                .orElseThrow(() -> new NotFoundException("Todo not found: " + id));
    }

    @Override
    public void deleteById(int id) {
        Todos todo = todoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Todo not found: " + id));
        todoRepository.delete(todo);
    }
}
