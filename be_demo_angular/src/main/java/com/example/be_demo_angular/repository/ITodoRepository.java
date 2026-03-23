package com.example.be_demo_angular.repository;

import com.example.be_demo_angular.model.entity.Todos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITodoRepository extends JpaRepository<Todos, Integer> {
    java.util.List<Todos> findAllByOrderByUpdatedDescCreatedDesc();
}
