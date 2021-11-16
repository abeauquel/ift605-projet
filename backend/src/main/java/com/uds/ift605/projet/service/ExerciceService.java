package com.uds.ift605.projet.service;

import com.uds.ift605.projet.entity.Exercice;
import com.uds.ift605.projet.repository.ExerciceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ExerciceService {
    @Autowired
    private ExerciceRepository exerciceRepository;

    public List<Exercice> list() {
        return exerciceRepository.findAll();
    }

    public Exercice save(Exercice obj) throws IOException {
        return exerciceRepository.save(obj);
    }

    public Exercice getExercice(Long id) throws Exception {
        Optional<Exercice> exercice = exerciceRepository.findById(id);
        if(!exercice.isPresent())
            throw new Exception("idExercice n'existe pas ");
        return exercice.get();
    }

    @EventListener(ApplicationReadyEvent.class)
    public void createBasicExercices() throws IOException {
        if(list().isEmpty()){
            System.out.println("createBasicExercices()");
            Exercice exercice1 = new Exercice("situp");
            Exercice exercice2 = new Exercice("squat");
            Exercice exercice3 = new Exercice("jump squat");

            save(exercice1);
            save(exercice2);
            save(exercice3);
        }
    }
}
