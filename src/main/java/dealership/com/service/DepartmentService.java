package dealership.com.service;

import dealership.com.exception.ResourceAlreadyExist;
import dealership.com.exception.ResourceNotFoundException;
import dealership.com.model.Department;
import dealership.com.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "https://car-dealership-pk.netlify.app")
@RestController
@RequestMapping("/department")
public class DepartmentService {

    @Autowired
    DepartmentRepository departmentRepository;

    @GetMapping
    public List<Department> getAllDepartments(){
        return departmentRepository.findAll();
    }

    @PostMapping
    public Department addDepartment(@RequestBody Department department) {
        Optional<Department> departmentFromDb = departmentRepository.findByName(department.getName());

        if(departmentFromDb.isPresent()){
            throw new ResourceAlreadyExist("Department already exist with name: "+ department.getName());
        }
        return departmentRepository.save(department);
    }

    @PutMapping("{id}")
    public ResponseEntity<Department> updateDepartment(@PathVariable long id,@RequestBody Department department) {
        Department updateDepartment = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not exist with id: " + id));

        updateDepartment.setCity(department.getCity());
        updateDepartment.setPostalCode(department.getPostalCode());
        updateDepartment.setName(department.getName());


        departmentRepository.save(updateDepartment);
        return ResponseEntity.ok(updateDepartment);
    }

    @GetMapping("{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable("id")  long id){
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not exist with id:" + id));

        return ResponseEntity.ok(department);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteDepartment(@PathVariable("id") long id){

        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not exist with id:" + id));

        departmentRepository.delete(department);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
