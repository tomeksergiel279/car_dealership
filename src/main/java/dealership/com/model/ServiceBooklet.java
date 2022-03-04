package dealership.com.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

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

    @OneToOne            //jedna książeczka dla jednego samochodu
    @NonNull
    private Car car;

    @NonNull
    @Column(name = "service_inspection")
    private Date serviceInspection;

    @Column(name = "repairs")
    private String repairs;
}
