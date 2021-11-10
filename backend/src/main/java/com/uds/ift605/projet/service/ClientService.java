package com.uds.ift605.projet.service;

import com.uds.ift605.projet.entity.Client;
import com.uds.ift605.projet.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;

    public List<Client> list() {
        return clientRepository.findAll();
    }

    public Client creerNouveauClient(Client client) throws IOException {
        return clientRepository.save(client);
    }

    public Client recupererClient(Long idClient) throws Exception {
        Optional<Client> client = clientRepository.findById(idClient);
        if(!client.isPresent())
            throw new Exception("idClient n'existe pas ");
        return client.get();
    }
}
