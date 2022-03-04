package dealership.com.service;

import dealership.com.exception.ResourceNotFoundException;
import dealership.com.model.*;
import dealership.com.repository.BuyRepository;
import dealership.com.repository.CarRepository;
import dealership.com.repository.ClientRepository;
import dealership.com.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/buy")
public class BuyService {

    @Autowired
    BuyRepository buyRepository;

    @Autowired
    CarRepository carRepository;

    @Autowired
    DepartmentRepository departmentRepository;

    @Autowired
    ClientRepository clientRepository;

    @GetMapping
    public List<Buy> getAllBuys(){
        return buyRepository.findAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<Buy> getBuyById(@PathVariable("id")  long id){
        Buy buy = buyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Buy not exist with id:" + id));

        return ResponseEntity.ok(buy);
    }

    @PostMapping
    public ResponseEntity addBuy(@RequestHeader(value = "vin") String vin, @RequestHeader(value = "name") String name, @RequestHeader(value = "login") String login) {

        Optional<Car> carFromDb = carRepository.findByVin(vin);
        Optional<Department> departmentFromDb = departmentRepository.findByName(name);
        Optional<Client> clientFromDb = clientRepository.findByLogin(login);

        if (carFromDb.isEmpty() || departmentFromDb.isEmpty() || clientFromDb.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Buy buy = new Buy(departmentFromDb.get(), clientFromDb.get(), carFromDb.get());
        buyRepository.save(buy);
        return ResponseEntity.ok(buy);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteBuy(@PathVariable("id") long id){

        Buy buy = buyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Buy not exist with id:" + id));

        buyRepository.delete(buy);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
