package com.uds.ift605.projet.service;

import com.uds.ift605.projet.entity.Client;
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

    @Autowired
    private ClientService clientService;

    @Autowired
    private TrainingService trainingService;

    public List<TrainingReport> list() {
        return trainingReportRepository.findAll();
    }

    public TrainingReport save(TrainingReport obj) throws Exception {
        return getTrainingReport(trainingReportRepository.save(obj).getId());
    }

    public TrainingReport getTrainingReport(Long id) throws Exception {
        Optional<TrainingReport> trainingReport = trainingReportRepository.findById(id);
        if(!trainingReport.isPresent())
            throw new Exception("idTrainingReport n'existe pas ");

        if(trainingReport.get().getClient() != null){
            Client client = clientService.recupererClient(trainingReport.get().getClient().getId());
            trainingReport.get().setClient(client);
        }

        trainingReport.get().setTraining(
                trainingService.getTraining(trainingReport.get().getTraining().getId())
        );

        return trainingReport.get();
    }
}
