package com.uds.ift605.projet.service;

import com.uds.ift605.projet.entity.Training;
import com.uds.ift605.projet.repository.TrainingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class TrainingService {
    @Autowired
    private TrainingRepository trainingRepository;

    public List<Training> list() {
        return trainingRepository.findAll();
    }

    public Training save(Training obj) throws IOException {
        return trainingRepository.save(obj);
    }

    public Training getTraining(Long id) throws Exception {
        Optional<Training> training = trainingRepository.findById(id);
        if(!training.isPresent())
            throw new Exception("idTraining n'existe pas ");
        return training.get();
    }
}
