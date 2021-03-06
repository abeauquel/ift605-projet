package com.uds.ift605.projet.controller;

import com.uds.ift605.projet.entity.Challenge;
import com.uds.ift605.projet.entity.Client;
import com.uds.ift605.projet.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.List;

@RestController
public class ClientController {
    @Autowired
    private ClientService clientService;

    @RequestMapping("/clients")
    public List<Client> getList() {
        return clientService.list();
    }

    @RequestMapping("/client/{id}")
    public Client getClient(@PathVariable Long id) throws Exception {
        return clientService.recupererClient(id);
    }

    @PostMapping("/client")
    public Client postClient(@RequestBody Client client) throws IOException {
        return clientService.creerNouveauClient(client);
    }

    @PutMapping("/client/{idClient}/coach/{idCoach}")
    public Client addCoach(@PathVariable Long idClient, @PathVariable Long idCoach) throws Exception {
        return clientService.addCoach(idCoach, idClient);
    }

    @DeleteMapping("/client/{idClient}/coach/{idCoach}")
    public Client removeCoach(@PathVariable Long idClient, @PathVariable Long idCoach) throws Exception {
        return clientService.removeCoach(idCoach, idClient);
    }

    @PutMapping("/client/{idClient}/friend/{idFriend}")
    public Client addFriend(@PathVariable Long idClient, @PathVariable Long idFriend) throws Exception {
        return clientService.addFriend(idFriend, idClient);
    }

    @DeleteMapping("/client/{idClient}/friend/{idFriend}")
    public Client removeFriend(@PathVariable Long idClient, @PathVariable Long idFriend) throws Exception {
        return clientService.removeFriend(idFriend, idClient);
    }

    @PutMapping("/client/{idClient}/challenge")
    public Client addChallenge(@PathVariable Long idClient, @RequestBody Challenge challenge) throws Exception {
        challenge.setDateCreation(new Timestamp(System.currentTimeMillis()));
        return clientService.addChallenge(idClient, challenge);
    }

    @DeleteMapping("/client/{idClient}/challenge/{idChallenge}")
    public Client addChallenge(@PathVariable Long idClient, @PathVariable Long idChallenge) throws Exception {
        return clientService.removeChallenge(idClient, idChallenge);
    }

    @PostMapping("/test")
    public String test() throws IOException {
        //Client client = new Client("Jean", "Jambon", "JJ", "SuperPassword 1234");
//        return clientService.creerNouveauClient(client);
        Client client = new Client("Jean", "Jambon", "JJ", "SuperPassword 1234");
        clientService.creerNouveauClient(client);
        return "OK";
    }
}
