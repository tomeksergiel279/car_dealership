package dealership.com.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@ToString
@Entity
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Column(name = "name")
    private String name;

    @NonNull
    @Column(name = "city")
    private String city;

    @NonNull
    @Column(name = "postal_code")
    private String postalCode;

    //jeden oddział może posiadać wielu pracowników
    @JsonIgnore
    @OneToMany(mappedBy = "department_employee")
    private Set<Employee> employees = new HashSet<>();

    //jeden oddział może posiadać wiele zakupów
    @JsonIgnore
    @OneToMany(mappedBy = "department_buy")
    private Set<Buy> buys = new HashSet<>();


}
