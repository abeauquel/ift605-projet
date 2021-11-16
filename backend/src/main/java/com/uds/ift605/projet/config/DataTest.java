package com.uds.ift605.projet.config;

import com.uds.ift605.projet.entity.*;
import com.uds.ift605.projet.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;

@Component
public class DataTest {

    private TrainingService trainingService;
    private ExerciceInTrainingService exerciceInTrainingService;
    private ExerciceService exerciceService;
    private TrainingReportService trainingReportService;
    private ClientService clientService;

    @Autowired
    public DataTest(TrainingService trainingService, ExerciceInTrainingService exerciceInTrainingService, ExerciceService exerciceService, TrainingReportService trainingReportService, ClientService clientService) {
        this.trainingService = trainingService;
        this.exerciceInTrainingService = exerciceInTrainingService;
        this.exerciceService = exerciceService;
        this.trainingReportService = trainingReportService;
        this.clientService = clientService;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void createBasicData() throws Exception {
        if(exerciceService.list().isEmpty()){
            System.out.println("create data :");

            System.out.println("create exercices");
            Exercice exercice1 = new Exercice("situp");
            Exercice exercice2 = new Exercice("squat");
            Exercice exercice3 = new Exercice("jump squat");

            exercice1 = exerciceService.save(exercice1);
            exercice2 = exerciceService.save(exercice2);
            exercice3 = exerciceService.save(exercice3);

            System.out.println("create clients");
            Client client1 = new Client("Jean", "Monet", "JM320", "password", 25, 150, 170);
            Client client2 = new Client("Marie", "Jeanne", "MJ123456", "MJ123456", 50, 120, 140);
            Client client3 = new Client("Jacque", "Jacque", "Coach", "superCoach", 27, 200, 190);

            client1 = clientService.creerNouveauClient(client1);
            client2 = clientService.creerNouveauClient(client2);
            client3 = clientService.creerNouveauClient(client3);

            System.out.println("create trainings");

            ExerciceInTraining exerciceInTraining11 = new ExerciceInTraining(exercice1, 5, 12);
            ExerciceInTraining exerciceInTraining12 = new ExerciceInTraining(exercice2, 5, 12);

            //exerciceInTraining11 = exerciceInTrainingService.save(exerciceInTraining11);
            //exerciceInTraining12 = exerciceInTrainingService.save(exerciceInTraining12);

            Training training1 = new Training("training1 du super Coach", new Timestamp(System.currentTimeMillis()), client3);
            training1.getExerciceInTrainingList().add(exerciceInTraining11);
            training1.getExerciceInTrainingList().add(exerciceInTraining12);
            training1 = trainingService.save(training1);

            ExerciceInTraining exerciceInTraining21 = new ExerciceInTraining(exercice3, 1, 100);
            //exerciceInTraining21 = exerciceInTrainingService.save(exerciceInTraining21);
            Training training2 = new Training("training2 du super Coach", new Timestamp(System.currentTimeMillis()), client3);
            training2.getExerciceInTrainingList().add(exerciceInTraining21);
            training2 = trainingService.save(training2);

            System.out.println("create trainings reports");

            TrainingReport trainingReport1 = new TrainingReport(
                    new Timestamp(System.currentTimeMillis()),
                    15,
                    200,
                    " super training encore!",
                    120,
                    150,
                    80,
                    100,
                    client1,
                    training1,
                    10
            );


            TrainingReport trainingReport2 = new TrainingReport(
                    new Timestamp( 1627790400),
                    17,
                    220,
                    " super training !",
                    121,
                    151,
                    79,
                    100,
                    client1,
                    training1,
                    9
            );

            TrainingReport trainingReport3 = new TrainingReport(
                    new Timestamp( 1627790400),
                    14,
                    100,
                    "Pas aimé du tout",
                    119,
                    140,
                    79,
                    80,
                    client1,
                    training2,
                    9
            );

            trainingReportService.save(trainingReport2);
            trainingReportService.save(trainingReport1);
            trainingReportService.save(trainingReport3);


            TrainingReport trainingReport4 = new TrainingReport(
                    new Timestamp( 1627790400),
                    10,
                    300,
                    "Sympa",
                    119,
                    190,
                    79,
                    80,
                    client2,
                    training2,
                    9
            );
            trainingReportService.save(trainingReport4);

        }else {
            System.out.println("Data already exist");
        }
    }
}
