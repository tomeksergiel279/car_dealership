package dealership.com.repository;

import dealership.com.model.Car;
import dealership.com.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface CarRepository extends JpaRepository<Car, Long> {

    Optional<Car> findByVin(int vin);    //wyszukanie samochodu po numerze VIN
}
