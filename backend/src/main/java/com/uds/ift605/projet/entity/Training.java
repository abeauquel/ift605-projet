package com.uds.ift605.projet.entity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class Training {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "date-creation")
    private Timestamp dateCreation;

    @JoinColumn
    @OneToMany
    private List<ExerciceInTraining> exerciceInTrainingList;

    public Training() {
        exerciceInTrainingList = new ArrayList<>();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Timestamp getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Timestamp dateCreation) {
        this.dateCreation = dateCreation;
    }

    public List<ExerciceInTraining> getExerciceInTrainingList() {
        return exerciceInTrainingList;
    }

    public void setExerciceInTrainingList(List<ExerciceInTraining> exerciceInTrainingList) {
        this.exerciceInTrainingList = exerciceInTrainingList;
    }
}
