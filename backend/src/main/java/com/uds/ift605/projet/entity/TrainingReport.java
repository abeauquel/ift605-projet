package com.uds.ift605.projet.entity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name ="training-report")
public class TrainingReport {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "date-creation")
    private Timestamp dateCreation;

    @Column(name = "tps-total-minute")
    private int tpsTotalMinute;

    @Column(name = "entrainement")
    private int entrainement;

    @Column(name = "nb-calorie")
    private int nbCalorie;

    @Column(name = "bpm-moyen")
    private int bpmMoyen;

    @Column(name = "bpm-max")
    private int bpmMax;

    @Column(name = "bpm-min")
    private int bpmMin;

    @Column(name = "pourcentage-realise")
    private int pourcentageRealise;

    @Column(name = "vitesse-execution-moyenne-par-mouvement")
    private List<Integer> listVitesseExecutionMoyenneParMouvement;

    public TrainingReport() {
        listVitesseExecutionMoyenneParMouvement = new ArrayList<>();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Timestamp getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Timestamp dateCreation) {
        this.dateCreation = dateCreation;
    }

    public int getTpsTotalMinute() {
        return tpsTotalMinute;
    }

    public void setTpsTotalMinute(int tpsTotalMinute) {
        this.tpsTotalMinute = tpsTotalMinute;
    }

    public int getEntrainement() {
        return entrainement;
    }

    public void setEntrainement(int entrainement) {
        this.entrainement = entrainement;
    }

    public int getNbCalorie() {
        return nbCalorie;
    }

    public void setNbCalorie(int nbCalorie) {
        this.nbCalorie = nbCalorie;
    }

    public int getBpmMoyen() {
        return bpmMoyen;
    }

    public void setBpmMoyen(int bpmMoyen) {
        this.bpmMoyen = bpmMoyen;
    }

    public int getBpmMax() {
        return bpmMax;
    }

    public void setBpmMax(int bpmMax) {
        this.bpmMax = bpmMax;
    }

    public int getBpmMin() {
        return bpmMin;
    }

    public void setBpmMin(int bpmMin) {
        this.bpmMin = bpmMin;
    }

    public int getPourcentageRealise() {
        return pourcentageRealise;
    }

    public void setPourcentageRealise(int pourcentageRealise) {
        this.pourcentageRealise = pourcentageRealise;
    }

    public List<Integer> getVitesseExecutionMoyenneParMouvement() {
        return listVitesseExecutionMoyenneParMouvement;
    }

    public void setVitesseExecutionMoyenneParMouvement(List<Integer> vitesseExecutionMoyenneParMouvement) {
        this.listVitesseExecutionMoyenneParMouvement = vitesseExecutionMoyenneParMouvement;
    }
}
