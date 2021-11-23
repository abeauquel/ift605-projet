package com.uds.ift605.projet.entity;

import com.uds.ift605.projet.dto.ClientDTO;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name ="challenge")
public class Challenge {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    private ClientDTO clientDTO;

    private Long idTraining;

    @Column(name = "date_creation")
    private Timestamp dateCreation;

    public Challenge() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Challenge(Long id, ClientDTO clientDTO, Timestamp dateCreation) {
        this.id = id;
        this.clientDTO = clientDTO;
        this.dateCreation = dateCreation;
    }

    public ClientDTO getClientDTO() {
        return clientDTO;
    }

    public void setClientDTO(ClientDTO clientDTO) {
        this.clientDTO = clientDTO;
    }

    public Timestamp getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Timestamp dateCreation) {
        this.dateCreation = dateCreation;
    }

    public Long getIdTraining() {
        return idTraining;
    }

    public void setIdTraining(Long idTraining) {
        this.idTraining = idTraining;
    }
}
