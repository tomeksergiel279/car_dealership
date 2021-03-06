package dealership.com.model;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@Entity
@NoArgsConstructor
@Table(name = "buys")
public class Buy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //jeden oddział może posiadać wiele zakupów
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "department_id", referencedColumnName = "id", nullable = false)
    private Department department_buy;

    //jeden klient może posiadać wiele zakupów
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "client_id", referencedColumnName = "id", nullable = false)
    private Client client;

    //jeden pracownik może posiadać wiele zakupów
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    private Employee employee;

    //jeden samochód dla jednego zakupu
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "car_id")
    private Car car;

    public Buy(Department department_buy, Client client, Car car, Employee employee) {
        this.department_buy = department_buy;
        this.client = client;
        this.car = car;
        this.employee = employee;
    }
}
