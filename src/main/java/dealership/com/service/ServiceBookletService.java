package dealership.com.service;

import dealership.com.email.SendReminder;
import dealership.com.exception.ResourceNotFoundException;
import dealership.com.model.Car;
import dealership.com.model.ServiceBooklet;
import dealership.com.repository.CarRepository;
import dealership.com.repository.ServiceBookletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

import java.util.Calendar;
import java.util.Date;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/servicebooklet")
public class ServiceBookletService {

    SendReminder sendReminder = new SendReminder();

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
    public ResponseEntity<ServiceBooklet> updateServiceBooklet(@PathVariable long id, @RequestBody ServiceBooklet serviceBooklet, @RequestHeader("email") String email) throws ParseException {
        ServiceBooklet updateServiceBooklet = serviceBookletRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceBooklet not exist with id: " + id));

        updateServiceBooklet.setServiceInspection(serviceBooklet.getServiceInspection());
        updateServiceBooklet.setRepair(serviceBooklet.getRepair());
        updateServiceBooklet.setRepairDate(serviceBooklet.getRepairDate());
        updateServiceBooklet.setRepairProducent(serviceBooklet.getRepairProducent());

        serviceBookletRepository.save(updateServiceBooklet);

        SimpleDateFormat sdf = new SimpleDateFormat("dd-M-yyyy hh:mm:ss");
        Date date = sdf.parse(updateServiceBooklet.getServiceInspection());

        GregorianCalendar cal = new GregorianCalendar();
        cal.setTime(date);
        cal.add(Calendar.DATE, -2);   //minus 2 days

        Date sendDate = cal.getTime();

        System.out.println(sendDate);

        Timer t = new Timer();
        TimerTask tt = new TimerTask() {
            @Override
            public void run() {
                sendReminder.send(email);
            };
        };
        t.schedule(tt, sendDate);

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
