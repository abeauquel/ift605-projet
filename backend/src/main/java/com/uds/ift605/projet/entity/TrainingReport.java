package com.uds.ift605.projet.entity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name ="training_report")
public class TrainingReport {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "date_creation")
    private Timestamp dateCreation;

    @Column(name = "tps_total_minute")
    private int tpsTotalMinute;

    @Column(name = "nb_calorie")
    private int nbCalorie;

    @Column(name = "description")
    private String description;

    @Column(name = "bpm_moyen")
    private int bpmMoyen;

    @Column(name = "bpm_max")
    private int bpmMax;

    @Column(name = "bpm_min")
    private int bpmMin;

    @Column(name = "pourcentage_realise")
    private int pourcentageRealise;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "client_id")
    private Client client;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "training_id")
    private Training training;

    @Column(name = "vitesse_execution_moyenne")
    private int vitesseExecutionMoyenne;

    public TrainingReport() {
    }

    public TrainingReport(Timestamp dateCreation, int tpsTotalMinute, int nbCalorie, String description, int bpmMoyen, int bpmMax, int bpmMin, int pourcentageRealise, Client client, Training training, int vitesseExecutionMoyenne) {
        this.dateCreation = dateCreation;
        this.tpsTotalMinute = tpsTotalMinute;
        this.nbCalorie = nbCalorie;
        this.description = description;
        this.bpmMoyen = bpmMoyen;
        this.bpmMax = bpmMax;
        this.bpmMin = bpmMin;
        this.pourcentageRealise = pourcentageRealise;
        this.client = client;
        this.training = training;
        this.vitesseExecutionMoyenne = vitesseExecutionMoyenne;
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

    public int getVitesseExecutionMoyenne() {
        return vitesseExecutionMoyenne;
    }

    public void setVitesseExecutionMoyenne(int vitesseExecutionMoyenne) {
        this.vitesseExecutionMoyenne = vitesseExecutionMoyenne;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Training getTraining() {
        return training;
    }

    public void setTraining(Training training) {
        this.training = training;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String name) {
        this.description = name;
    }
}
