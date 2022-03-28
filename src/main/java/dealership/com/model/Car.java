package dealership.com.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "cars")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "vin", nullable = false, unique = true)
    private String vin;

    @Column(name = "img", nullable = false)
    private String img;

    @Column(name = "mark", nullable = false)
    private String mark;

    @Column(name = "model", nullable = false)
    private String model;

    @Column(name = "color", nullable = false)
    private String color;

    @Column(name = "production_year", nullable = false)
    private long productionYear;

    @Column(name = "price", nullable = false)
    private long price;

    @Column(name = "available", nullable = false)
    private String available;

    //jedna książka dla jednego samochodu
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "car_booklet")
    private ServiceBooklet serviceBooklet;

    //jeden samochód dla jednego zakupu
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "car")
    @JsonBackReference
    private Buy buy;

}