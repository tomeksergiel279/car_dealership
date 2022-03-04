package dealership.com.model;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@ToString
@Entity
@Table(name = "buys")
public class Buy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne                      //wiele zakupów w jednym oddziale
    @NonNull
    private Department department;

    @ManyToOne                      //wiele zakupów dla jednego klienta
    @NonNull
    private Client client;

    @OneToOne                       //jeden zakup dla jednego samochodu
    @NonNull
    private Car car;
}
