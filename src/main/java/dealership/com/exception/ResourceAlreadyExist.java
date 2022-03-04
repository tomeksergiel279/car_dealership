package dealership.com.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
public class ResourceAlreadyExist extends RuntimeException{

    public ResourceAlreadyExist(String message){
        super(message);
    }
}
