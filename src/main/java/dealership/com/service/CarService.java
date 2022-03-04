package dealership.com.service;

import dealership.com.exception.ResourceAlreadyExist;
import dealership.com.exception.ResourceNotFoundException;
import dealership.com.model.Car;
import dealership.com.model.Client;
import dealership.com.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/car")
public class CarService {

    @Autowired
    CarRepository carRepository;

    @GetMapping
    public List<Car> getAllCars(){
        return carRepository.findAll();
    }

    @PostMapping
    public Car addCar(@RequestBody Car car) {
        Optional<Car> clientFromDb = carRepository.findByVin(car.getVin());

        if(clientFromDb.isPresent()){
            throw new ResourceAlreadyExist("Car already exist with vin: "+ car.getVin());
        }

        return carRepository.save(car);
    }

    @GetMapping("{id}")
    public ResponseEntity<Car> getCarById(@PathVariable("id")  long id){
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Car not exist with id:" + id));

        return ResponseEntity.ok(car);
    }

    @PutMapping("{id}")
    public ResponseEntity<Car> updateCar(@PathVariable long id,@RequestBody Car car) {
        Car updateCar = carRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Car not exist with id: " + id));

        updateCar.setVin(car.getVin());
        updateCar.setImg(car.getImg());
        updateCar.setMark(car.getMark());
        updateCar.setModel(car.getModel());
        updateCar.setColor(car.getColor());
        updateCar.setProductionYear(car.getProductionYear());
        updateCar.setPrice(car.getPrice());

        carRepository.save(updateCar);

        return ResponseEntity.ok(updateCar);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteCar(@PathVariable("id") long id){
        Optional<Car> carFromDb = carRepository.findById(id);

        Car car = carRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Car not exist with id:" + id));

        carRepository.delete(car);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
