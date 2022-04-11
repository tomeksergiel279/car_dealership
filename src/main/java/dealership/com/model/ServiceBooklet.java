package dealership.com.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.*;
import javax.persistence.*;
import java.util.Date;


@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
@Entity
@Table(name="service_booklet")
public class ServiceBooklet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //jedna książka dla jednego samochodu
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "car_id", unique = true, nullable = false)
    @JsonBackReference
    private Car car_booklet;

    @Column(name = "service_inspection")
    private String serviceInspection;

    @Column(name = "last_repair")
    private String lastRepair;
}