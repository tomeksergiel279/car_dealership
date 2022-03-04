package dealership.com.repository;

import dealership.com.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface CarRepository extends JpaRepository<Car, Long> {

    Optional<Car> findByVin(String vin);    //wyszukanie samochodu po numerze VIN
}
