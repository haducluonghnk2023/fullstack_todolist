package com.example.be_demo_angular.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Table(name = "todos")
@Entity
@Getter
@Setter
public class Todos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String text;
    @Column(nullable = false)
    private boolean done;
    @Column(nullable = true)
    private Date created;
    @Column(nullable = true)
    private Date updated;
}
