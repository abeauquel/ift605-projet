package com.uds.ift605.projet.service;

import com.uds.ift605.projet.dto.ClientDTO;
import com.uds.ift605.projet.entity.Client;
import com.uds.ift605.projet.repository.ClientDTORepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClientDTOService {
    @Autowired
    private ClientDTORepository clientDTORepository;

    public void delete (Long id){
        clientDTORepository.deleteById(id);
    }

    public ClientDTO getOrCreate(Client client){
        Optional<ClientDTO> clientDTOOptional = clientDTORepository.findById(client.getId());
        ClientDTO clientDTO = null;
        clientDTO = clientDTOOptional.orElseGet(() -> clientDTORepository.save(new ClientDTO(client)));

        return clientDTO;
    }
}
