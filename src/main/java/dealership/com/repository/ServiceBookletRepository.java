package dealership.com.repository;

import dealership.com.model.ServiceBooklet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceBookletRepository extends JpaRepository<ServiceBooklet, Long> {
}
