package com.uds.ift605.projet.entity;

import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name ="training")
public class Training {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "date_creation")
    private Timestamp dateCreation;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client creator;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ExerciceInTraining> exerciceInTrainingList;

    public Training() {
        exerciceInTrainingList = new ArrayList<>();
    }

    public Training(String name, Timestamp dateCreation, Client creator) {
        exerciceInTrainingList = new ArrayList<>();
        this.name = name;
        this.dateCreation = dateCreation;
        this.creator = creator;
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

    public Client getCreator() {
        return creator;
    }

    public void setCreator(Client creator) {
        this.creator = creator;
    }
}
