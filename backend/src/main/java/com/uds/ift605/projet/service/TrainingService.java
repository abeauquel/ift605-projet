package com.uds.ift605.projet.service;

import com.uds.ift605.projet.entity.Client;
import com.uds.ift605.projet.entity.ExerciceInTraining;
import com.uds.ift605.projet.entity.Training;
import com.uds.ift605.projet.repository.ClientRepository;
import com.uds.ift605.projet.repository.ExerciceInTrainingRepository;
import com.uds.ift605.projet.repository.TrainingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TrainingService {
    @Autowired
    private TrainingRepository trainingRepository;

    @Autowired
    private ExerciceInTrainingService exerciceInTrainingService;

    @Autowired
    private ClientService clientService;

    public List<Training> list() {
        return trainingRepository.findAll();
    }

    public Training save(Training obj) throws Exception {
        long id = trainingRepository.save(obj).getId();
        Training training = getTraining(id);
        return training;
    }

    public Training getTraining(Long id) throws Exception {
        Optional<Training> training = trainingRepository.findById(id);
        if(!training.isPresent())
            throw new Exception("idTraining n'existe pas ");

        if(training.get().getCreator() != null){
            Client client = clientService.recupererClient(training.get().getCreator().getId());
            training.get().setCreator(client);
        }

        List<ExerciceInTraining> exercicesWithData = new ArrayList<>();
        for (ExerciceInTraining ex:training.get().getExerciceInTrainingList()) {
            exercicesWithData.add(exerciceInTrainingService.getExerciceInTraining(ex.getId()));
        }
        training.get().setExerciceInTrainingList(exercicesWithData);

        return training.get();
    }
}
