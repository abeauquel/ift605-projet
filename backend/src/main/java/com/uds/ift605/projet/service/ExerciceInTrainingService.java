package com.uds.ift605.projet.service;

import com.uds.ift605.projet.entity.ExerciceInTraining;
import com.uds.ift605.projet.repository.ExerciceInTrainingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ExerciceInTrainingService {
    @Autowired
    private ExerciceInTrainingRepository exerciceInTrainingRepository;

    @Autowired
    private ExerciceService exerciceService;

    public List<ExerciceInTraining> list() {
        return exerciceInTrainingRepository.findAll();
    }

    public ExerciceInTraining save(ExerciceInTraining obj) throws IOException {
        return exerciceInTrainingRepository.save(obj);
    }

    public ExerciceInTraining getExerciceInTraining(Long id) throws Exception {
        Optional<ExerciceInTraining> exerciceInTraining = exerciceInTrainingRepository.findById(id);
        if(!exerciceInTraining.isPresent())
            throw new Exception("idExerciceInTraining n'existe pas ");

        exerciceInTraining.get().setExercice(exerciceService.getExercice(exerciceInTraining.get().getExercice().getId()));

        return exerciceInTraining.get();
    }
}
