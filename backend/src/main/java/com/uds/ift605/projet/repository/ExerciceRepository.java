package com.uds.ift605.projet.repository;

import com.uds.ift605.projet.entity.Client;
import com.uds.ift605.projet.entity.Exercice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExerciceRepository extends JpaRepository<Exercice, Long> {
}