package dealership.com.service;

import dealership.com.email.SendEmail;
import dealership.com.email.SendMessage;
import dealership.com.exception.ResourceAlreadyExist;
import dealership.com.exception.ResourceNotFoundException;
import dealership.com.model.Car;
import dealership.com.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;


@CrossOrigin(origins = "https://car-dealership-pk.netlify.app")
@RestController
@RequestMapping("/car")
public class CarService {

    SendEmail sendEmail = new SendEmail();
    SendMessage sendMessage = new SendMessage();

    @Autowired
    CarRepository carRepository;

    @GetMapping
    public List<Car> getAllCars(){
        return carRepository.findAll();
    }

    @PostMapping
    public Car addCar(@RequestBody Car car) {
        Optional<Car> carFromDb = carRepository.findByVin(car.getVin());

        if(carFromDb.isPresent()){
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
        updateCar.setAvailable(car.getAvailable());
        updateCar.setType(car.getType());
        updateCar.setReservation(car.getReservation());

        carRepository.save(updateCar);

        return ResponseEntity.ok(updateCar);
    }

    @PutMapping("reserve/{id}")
    public ResponseEntity<Car> reserveCar(@PathVariable long id,@RequestBody Car car, @RequestHeader("email") String email) {
        Car updateCar = carRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Car not exist with id: " + id));

        updateCar.setReservation(car.getReservation());

        sendEmail.sendReservation(email, car.getMark());

        carRepository.save(updateCar);

        Date now = new Date(System.currentTimeMillis());

        GregorianCalendar cal = new GregorianCalendar();
        cal.setTime(now);
        cal.add(Calendar.DATE, 3);

        Date cancelDate = cal.getTime();
        System.out.println(cancelDate);

        Timer t = new Timer();
        TimerTask tt = new TimerTask() {
            @Override
            public void run() {
                Car updateCar = carRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Car not exist with id: " + id));
                updateCar.setReservation("Nie");
                carRepository.save(updateCar);
            };
        };
        t.schedule(tt, cancelDate);

        return ResponseEntity.ok(updateCar);
    }

    @PutMapping("message/{id}")
    public ResponseEntity<Car> messageCar(@PathVariable long id,@RequestBody Car car, @RequestHeader("email") String email) {
        Car updateCar = carRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Car not exist with id: " + id));


        sendMessage.sendMessage(email, car.getMark());

        return ResponseEntity.ok(updateCar);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteCar(@PathVariable("id") long id){

        Car car = carRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Car not exist with id:" + id));

        carRepository.delete(car);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
