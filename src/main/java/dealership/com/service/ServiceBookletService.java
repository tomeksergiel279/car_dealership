package dealership.com.service;

import dealership.com.exception.ResourceAlreadyExist;
import dealership.com.exception.ResourceNotFoundException;
import dealership.com.model.Car;
import dealership.com.model.Department;
import dealership.com.model.Employee;
import dealership.com.model.ServiceBooklet;
import dealership.com.repository.CarRepository;
import dealership.com.repository.ServiceBookletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/servicebooklet")
public class ServiceBookletService {

    @Autowired
    ServiceBookletRepository serviceBookletRepository;

    @Autowired
    CarRepository carRepository;

    @GetMapping
    public List<ServiceBooklet> getAllServiceBooklets(){
        return serviceBookletRepository.findAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<ServiceBooklet> getServiceBookletById(@PathVariable("id")  long id){
        ServiceBooklet serviceBooklet = serviceBookletRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceBooklet not exist with id:" + id));

        return ResponseEntity.ok(serviceBooklet);
    }

    @PostMapping
    public ServiceBooklet addServiceBooklet(@RequestBody ServiceBooklet serviceBooklet, @RequestHeader("vin") String vin) {

        Car car = carRepository.findByVin(vin)
                .orElseThrow(() -> new ResourceNotFoundException("Car not exist with vin:" + vin));

        serviceBooklet.setCar_booklet(car);
        return serviceBookletRepository.save(serviceBooklet);
    }

    @PutMapping("{id}")
    public ResponseEntity<ServiceBooklet> updateServiceBooklet(@PathVariable long id, @RequestBody ServiceBooklet serviceBooklet) {
        ServiceBooklet updateServiceBooklet = serviceBookletRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceBooklet not exist with id: " + id));

        updateServiceBooklet.setServiceInspection(serviceBooklet.getServiceInspection());
        updateServiceBooklet.setLastRepair(serviceBooklet.getLastRepair());

        serviceBookletRepository.save(updateServiceBooklet);

        return ResponseEntity.ok(updateServiceBooklet);
    }


    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteServiceBooklet(@PathVariable("id") long id){

        ServiceBooklet serviceBooklet = serviceBookletRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceBooklet not exist with id:" + id));

        serviceBookletRepository.delete(serviceBooklet);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
