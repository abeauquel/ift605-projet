package com.uds.ift605.projet.entity;

import javax.persistence.*;

@Entity
@Table(name ="exercice_in_training")
public class ExerciceInTraining {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name = "exercice_id", nullable = false)
    private Exercice exercice;

    @Column(name = "set")
    private int set;

    @Column(name = "repetition")
    private int repetition;

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

    public int getSet() {
        return set;
    }

    public void setSet(int set) {
        this.set = set;
    }

    public int getRepetition() {
        return repetition;
    }

    public void setRepetition(int repetion) {
        this.repetition = repetion;
    }
}
