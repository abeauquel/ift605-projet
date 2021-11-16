package com.uds.ift605.projet.repository;

import com.uds.ift605.projet.entity.ExerciceInTraining;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExerciceInTrainingRepository extends JpaRepository<ExerciceInTraining, Long> {

}