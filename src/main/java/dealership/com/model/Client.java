package dealership.com.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@ToString
@Entity
@Table(name = "clients")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Column(name = "login")
    private String login;

    @NonNull
    @Column(name = "password")
    private String password;

    @NonNull
    @Column(name = "email")
    private String email;

    @NonNull
    @Column(name = "first_name")
    private String firstName;

    @NonNull
    @Column(name = "last_name")
    private String lastName;

    @NonNull
    @Column(name = "postal_code")
    private String postalCode;

    @NonNull
    @Column(name = "address")
    private String address;

    @NonNull
    @Column(name = "phone_number")
    private int phoneNumber;

    //jeden kklient może posiadać wiele zakupów
    @JsonIgnore
    @OneToMany(mappedBy = "client")
    private Set<Buy> buys = new HashSet<>();
}
