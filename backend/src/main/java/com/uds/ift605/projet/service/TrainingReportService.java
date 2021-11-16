package com.uds.ift605.projet.service;

import com.uds.ift605.projet.entity.TrainingReport;
import com.uds.ift605.projet.repository.TrainingReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class TrainingReportService {
    @Autowired
    private TrainingReportRepository trainingReportRepository;

    public List<TrainingReport> list() {
        return trainingReportRepository.findAll();
    }

    public TrainingReport save(TrainingReport obj) throws IOException {
        return trainingReportRepository.save(obj);
    }

    public TrainingReport getTrainingReport(Long id) throws Exception {
        Optional<TrainingReport> trainingReport = trainingReportRepository.findById(id);
        if(!trainingReport.isPresent())
            throw new Exception("idTrainingReport n'existe pas ");
        return trainingReport.get();
    }
}
