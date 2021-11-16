package com.uds.ift605.projet.controller;

import com.uds.ift605.projet.entity.Exercice;
import com.uds.ift605.projet.service.ExerciceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
public class ExerciceController {
    @Autowired
    private ExerciceService exerciceService;

    @RequestMapping("/exercices")
    public List<Exercice> getList() {
        return exerciceService.list();
    }

    @RequestMapping("/exercice/{id}")
    public Exercice getExercice(@PathVariable Long id) throws Exception {
        return exerciceService.getExercice(id);
    }

    @PostMapping("/exercice")
    public Exercice postExercice(@RequestBody Exercice exercice) throws IOException {
        return exerciceService.save(exercice);
    }

}
