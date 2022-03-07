package dealership.com.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
@ToString
@Entity
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "postal_code", nullable = false)
    private String postalCode;

    //jeden oddział może posiadać wielu pracowników
    @OneToMany(mappedBy = "department_employee")
    private Set<Employee> employees = new HashSet<>();

    //jeden oddział może posiadać wiele zakupów
    @JsonBackReference
    @OneToMany(mappedBy = "department_buy")
    private Set<Buy> buys = new HashSet<>();


}
