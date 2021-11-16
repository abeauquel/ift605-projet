package com.uds.ift605.projet.entity;

import javax.persistence.*;

@Entity
@Table(name ="exercice-in-training")
public class ExerciceInTraining {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @JoinColumn(name = "exercice")
    @ManyToOne
    private Exercice exercice;

    public ExerciceInTraining() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Exercice getExercice() {
        return exercice;
    }

    public void setExercice(Exercice exercice) {
        this.exercice = exercice;
    }
}
