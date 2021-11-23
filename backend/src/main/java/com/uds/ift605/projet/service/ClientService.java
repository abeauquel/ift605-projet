package com.uds.ift605.projet.service;

import com.uds.ift605.projet.entity.Client;
import com.uds.ift605.projet.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
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

    public Client recupererClient(String username) throws Exception {
        Optional<Client> client = clientRepository.findClientByUserName(username);
        if(!client.isPresent())
            throw new Exception("idClient n'existe pas ");
        return client.get();
    }

    public Client addCoach(Long idCoach, Long idClient) throws Exception {
        if(Objects.equals(idCoach, idClient))
            throw new Exception("error idCoach == idClient");
        Client coach = recupererClient(idCoach);
        Client client = recupererClient(idClient);

        if(client.getCoachs().stream().anyMatch(id -> Objects.equals(id, coach.getId())))
            throw new Exception("error coach est deja dans la liste");

        client.getCoachs().add(coach.getId());
        return clientRepository.save(client);
    }

    public Client removeCoach(Long idCoach, Long idClient) throws Exception {
        if(Objects.equals(idCoach, idClient))
            throw new Exception("error idCoach == idClient");
        Client client = recupererClient(idClient);
        client.removeCoachById(idCoach);
        return clientRepository.save(client);
    }

    public Client addFriend(Long idFriend, Long idClient) throws Exception {
        if(Objects.equals(idFriend, idClient))
            throw new Exception("error idFriend == idClient");
        Client friend = recupererClient(idFriend);
        Client client = recupererClient(idClient);

        if(client.getFriends().stream().anyMatch(id -> Objects.equals(id, friend.getId())))
            throw new Exception("error client est deja dans la liste");

        client.getFriends().add(friend.getId());
        return clientRepository.save(client);
    }

    public Client removeFriend(Long idFriend, Long idClient) throws Exception {
        if(Objects.equals(idFriend, idClient))
            throw new Exception("error idFriend == idClient");
        Client client = recupererClient(idClient);
        client.removeFriendById(idFriend);
        return clientRepository.save(client);
    }
}
