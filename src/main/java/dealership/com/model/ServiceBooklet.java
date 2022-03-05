package dealership.com.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
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
    @JoinColumn(name = "car_id")
    @JsonBackReference
    private Car car_booklet;

    @NonNull
    @Column(name = "service_inspection")
    private Date serviceInspection;

    @Column(name = "repairs")
    private String repairs;
}
