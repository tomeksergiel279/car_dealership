package dealership.com.service;

import dealership.com.exception.ResourceAlreadyExist;
import dealership.com.exception.ResourceNotFoundException;
import dealership.com.model.Client;
import dealership.com.model.Employee;
import dealership.com.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/client")
public class ClientService {

    @Autowired
    ClientRepository clientRepository;

    @GetMapping
    public List<Client> getAllClients(){
        return clientRepository.findAll();
    }

    @PostMapping
    public Client addClient(@RequestBody Client client) {
        Optional<Client> clientFromDb = clientRepository.findByLogin(client.getLogin());

        if(clientFromDb.isPresent()){
            throw new ResourceAlreadyExist("Client already exist with login: "+ client.getLogin());
        }

        return clientRepository.save(client);
    }

    @GetMapping("{id}")
    public ResponseEntity<Client> getClientById(@PathVariable("id")  long id){
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client not exist with id:" + id));

        return ResponseEntity.ok(client);
    }

    @PutMapping("{id}")
    public ResponseEntity<Client> updateClient(@PathVariable long id,@RequestBody Client client) {
        Client updateClient = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client not exist with id: " + id));

        updateClient.setLogin(client.getLogin());
        updateClient.setPassword(client.getPassword());
        updateClient.setEmail(client.getEmail());
        updateClient.setAddress(client.getAddress());
        updateClient.setPostalCode(client.getPostalCode());
        updateClient.setFirstName(client.getFirstName());
        updateClient.setLastName(client.getLastName());
        updateClient.setPhoneNumber(client.getPhoneNumber());

        clientRepository.save(updateClient);

        return ResponseEntity.ok(updateClient);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteClient(@PathVariable("id") long id){

        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client not exist with id:" + id));

        clientRepository.delete(client);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestHeader("login") String login, @RequestHeader("password") String password) {
        Optional<Client> clientFromDb = clientRepository.findByLogin(login);

        if (clientFromDb.isEmpty() || !checkPassword(clientFromDb, password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok().build();
    }

    private boolean checkPassword(Optional<Client> clientFromDb, String password) {
        return clientFromDb.get().getPassword().equals(password);
    }
}
