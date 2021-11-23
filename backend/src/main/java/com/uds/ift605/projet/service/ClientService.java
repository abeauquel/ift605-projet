package com.uds.ift605.projet.service;

import com.uds.ift605.projet.dto.ClientDTO;
import com.uds.ift605.projet.entity.Challenge;
import com.uds.ift605.projet.entity.Client;
import com.uds.ift605.projet.repository.ChallengeRepository;
import com.uds.ift605.projet.repository.ClientDTORepository;
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

    @Autowired
    private ChallengeRepository challengeRepository;

    @Autowired
    private ClientDTOService clientDTOService;

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

    public Challenge recupererChallenge(Long idChallenge) throws Exception {
        Optional<Challenge> challenge = challengeRepository.findById(idChallenge);
        if(!challenge.isPresent())
            throw new Exception("idChallenge n'existe pas ");
        return challenge.get();
    }

    public Client addCoach(Long idCoach, Long idClient) throws Exception {
        if(Objects.equals(idCoach, idClient))
            throw new Exception("error idCoach == idClient");
        Client coach = recupererClient(idCoach);
        Client client = recupererClient(idClient);

        if(client.getCoachs().stream().anyMatch(clientDTO -> Objects.equals(clientDTO.getId(), coach.getId())))
            throw new Exception("error coach est deja dans la liste");

        client.getCoachs().add(clientDTOService.getOrCreate(coach));
        return clientRepository.save(client);
    }

    public Client removeCoach(Long idCoach, Long idClient) throws Exception {
        if(Objects.equals(idCoach, idClient))
            throw new Exception("error idCoach == idClient");
        Client client = recupererClient(idClient);
        client.removeCoachById(idCoach);
        clientRepository.save(client);
        return client;
    }

    public Client addFriend(Long idFriend, Long idClient) throws Exception {
        if(Objects.equals(idFriend, idClient))
            throw new Exception("error idFriend == idClient");
        Client friend = recupererClient(idFriend);
        Client client = recupererClient(idClient);

        if(client.getFriends().stream().anyMatch(clientDTO -> Objects.equals(clientDTO.getId(), friend.getId())))
            throw new Exception("error client est deja dans la liste");

        client.getFriends().add(clientDTOService.getOrCreate(friend));
        return clientRepository.save(client);
    }

    public Client removeFriend(Long idFriend, Long idClient) throws Exception {
        if(Objects.equals(idFriend, idClient))
            throw new Exception("error idFriend == idClient");
        Client client = recupererClient(idClient);
        client.removeFriendById(idFriend);
        clientRepository.save(client);
        return client;
    }

    public Client addChallenge(Long idClient, Challenge challenge) throws Exception {
        if(Objects.equals(challenge.getClientDTO().id, idClient))
            throw new Exception("error challenge.getClientDTO().id == idClient");
        Client client = recupererClient(idClient);
        Client creatorChallenge = recupererClient(challenge.getClientDTO().getId());
        challenge.setClientDTO(clientDTOService.getOrCreate(creatorChallenge));
        client.getChallenges().add(challengeRepository.save(challenge));
        return clientRepository.save(client);
    }

    public Client removeChallenge(Long idClient, Long idChallenge) throws Exception {
        Client client = recupererClient(idClient);
        Challenge challenge = recupererChallenge(idChallenge);
        client.removeChallengeById(idChallenge);
        clientRepository.save(client);
        challengeRepository.delete(challenge);
        return client;
    }
}
