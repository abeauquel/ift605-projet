package com.uds.ift605.projet.repository;

import com.uds.ift605.projet.dto.ClientDTO;
import com.uds.ift605.projet.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientDTORepository extends JpaRepository<ClientDTO, Long> {
}
