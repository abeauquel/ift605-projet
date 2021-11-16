package com.uds.ift605.projet.controller;

import com.uds.ift605.projet.entity.Training;
import com.uds.ift605.projet.service.TrainingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.List;

@RestController
public class TrainingController {
    @Autowired
    private TrainingService trainingService;

    @RequestMapping("/trainings")
    public List<Training> getList() {
        return trainingService.list();
    }

    @RequestMapping("/training/{id}")
    public Training getTraining(@PathVariable Long id) throws Exception {
        return trainingService.getTraining(id);
    }

    @PostMapping("/training")
    public Training postTraining(@RequestBody Training training) throws Exception {
        training.setDateCreation(new Timestamp(System.currentTimeMillis()));
        return trainingService.save(training);
    }

}
