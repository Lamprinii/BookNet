package com.unipi.BookNet.controller;

import com.unipi.BookNet.model.Book;
import com.unipi.BookNet.model.Role;
import com.unipi.BookNet.model.Users;
import com.unipi.BookNet.service.UsersService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Recover;
import org.springframework.retry.annotation.Retryable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/users")
@AllArgsConstructor
public class UsersController {
    private final UsersService usersService;
    private  PasswordEncoder passwordEncoder;


    @GetMapping(path = "/email/{encodedEmail}")
    @Retryable(maxAttempts = 5, backoff = @Backoff(delay = 1000))
    public Optional<Users> getUserbyEmail(@PathVariable("encodedEmail") String encodedEmail){
        //We can't enter the special chars "@" and "." at the pathName, that's why we will encode the email and the conversions
        // "@" -> "%40" and "." -> "%2E" would be ok as a path variable. The front-end should do the request using the encoded email
        // which will be decoded in the backend

        return usersService.getUserByEmail(encodedEmail);
    }
    @Recover
    public ResponseEntity<Users> Recover(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping(path="/getAllUsers")
    @Retryable(maxAttempts = 5, backoff = @Backoff(delay = 1000))
    public List<Users> getUsers(){
        return usersService.getAllUsers();
    }


    @DeleteMapping(path="{email}")
    @Retryable(maxAttempts = 5, backoff = @Backoff(delay = 1000), noRetryFor = IllegalArgumentException.class)
    public ResponseEntity deleteUser(@PathVariable("email") String email){

            usersService.deleteUser(email);

       //IllegalArgumentException
        return ResponseEntity.ok("User Deleted");
    }


    @PutMapping (path="{userId}")
    @Retryable(maxAttempts = 5, backoff = @Backoff(delay = 1000), noRetryFor = IllegalArgumentException.class)
    public ResponseEntity updateUser(@PathVariable("userId") long id, @RequestBody Users user){

            usersService.updateUser(id, user);

        //IllegalArgumentException
        return ResponseEntity.ok("User Updated") ;
    }

    @GetMapping("/getAllRoles")
    @Retryable(maxAttempts = 5, backoff = @Backoff(delay = 1000))
    public ResponseEntity getAllRoles() {
        return ResponseEntity.ok().body(Role.values());
    }


    @GetMapping(path="/id/{id}")
    @Retryable(maxAttempts = 5, backoff = @Backoff(delay = 1000))
    public ResponseEntity<Users> getUserById(@PathVariable("id") Long id){
        Users user = usersService.getUserById(id).orElseThrow();
        return ResponseEntity.ok(user);
    }



}
