package dealership.com.service;

import dealership.com.exception.ResourceAlreadyExist;
import dealership.com.exception.ResourceNotFoundException;
import dealership.com.model.Client;
import dealership.com.model.Department;
import dealership.com.model.Employee;

import dealership.com.repository.DepartmentRepository;
import dealership.com.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "https://car-dealership-pk.netlify.app")
@RestController
@RequestMapping("/employee")
public class EmployeeService {

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    DepartmentRepository departmentRepository;

    @GetMapping
    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    @PostMapping
    public Employee addEmployee(@RequestBody Employee employee) {

        Optional<Employee> employeeFromDB = employeeRepository.findByLogin(employee.getLogin());

        if(employeeFromDB.isPresent()){
            throw new ResourceAlreadyExist("Employee already exist with login: "+ employee.getLogin());
        }
        return employeeRepository.save(employee);
    }

    @GetMapping("{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable("id")  long id){
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id:" + id));

        return ResponseEntity.ok(employee);
    }

    @PutMapping("{id}")
    public ResponseEntity<Employee> updateClient(@PathVariable long id,@RequestBody Employee employee) {
        Employee updateEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));

        updateEmployee.setLogin(employee.getLogin());
        updateEmployee.setPassword(employee.getPassword());
        updateEmployee.setEmail(employee.getEmail());
        updateEmployee.setFirstName(employee.getFirstName());
        updateEmployee.setLastName(employee.getLastName());
        updateEmployee.setPhoneNumber(employee.getPhoneNumber());

        employeeRepository.save(updateEmployee);

        return ResponseEntity.ok(updateEmployee);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable("id") long id){

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id:" + id));

        employeeRepository.delete(employee);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody Employee employee) {
        Optional<Employee> employeeFromDb = employeeRepository.findByLogin(employee.getLogin());

        if (employeeFromDb.isEmpty() || wrongPassword(employeeFromDb, employee)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok().build();
    }

    private boolean wrongPassword(Optional<Employee> employeeFromDb, Employee employee) {
        return !employeeFromDb.get().getPassword().equals(employee.getPassword());
    }
}
