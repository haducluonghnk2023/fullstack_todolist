package com.example.be_demo_angular.services;

import com.example.be_demo_angular.model.entity.Todos;

import java.util.List;

public interface ITodoServices {
    Todos add(Todos todos);
    List<Todos> findAll();
    Todos update(int id, Todos todos);
    void deleteById(int id);
}
