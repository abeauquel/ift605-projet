package com.uds.ift605.projet.controller;

import com.uds.ift605.projet.entity.Client;
import com.uds.ift605.projet.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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


    @PostMapping("/test")
    public String test() throws IOException {
        //Client client = new Client("Jean", "Jambon", "JJ", "SuperPassword 1234");
//        return clientService.creerNouveauClient(client);
        Client client = new Client("Jean", "Jambon", "JJ", "SuperPassword 1234");
        clientService.creerNouveauClient(client);
        return "OK";
    }
}
