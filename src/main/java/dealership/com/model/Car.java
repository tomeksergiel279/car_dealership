package dealership.com.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@ToString
@Entity
@Table(name = "cars")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NonNull
    @Column(name = "vin")
    private String vin;

    @NonNull
    @Column(name = "img")
    private String img;

    @NonNull
    @Column(name = "mark")
    private String mark;

    @NonNull
    @Column(name = "model")
    private String model;

    @NonNull
    @Column(name = "color")
    private String color;

    @NonNull
    @Column(name = "production_year")
    private long productionYear;

    @NonNull
    @Column(name = "price")
    private long price;

    //jedna książka dla jednego samochodu
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "car_booklet")
    @JsonManagedReference
    private ServiceBooklet serviceBooklet;

    //jeden samochód dla jednego zakupu
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "car")
    @JsonManagedReference
    private Buy buy;

}
