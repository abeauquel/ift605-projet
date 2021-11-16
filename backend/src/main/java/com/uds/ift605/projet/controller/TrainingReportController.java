package com.uds.ift605.projet.controller;

import com.uds.ift605.projet.entity.TrainingReport;
import com.uds.ift605.projet.service.TrainingReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RestController
public class TrainingReportController {
    @Autowired
    private TrainingReportService trainingReportService;

    @RequestMapping("/trainingReports")
    public List<TrainingReport> getList() {
        return trainingReportService.list();
    }

    @RequestMapping("/trainingReport/{id}")
    public TrainingReport getTrainingReport(@PathVariable Long id) throws Exception {
        return trainingReportService.getTrainingReport(id);
    }

    @PostMapping("/trainingReport")
    public TrainingReport postTrainingReport(@RequestBody TrainingReport trainingReport) throws Exception {
        trainingReport.setDateCreation(new Timestamp(System.currentTimeMillis()));
        return trainingReportService.save(trainingReport);
    }

}
