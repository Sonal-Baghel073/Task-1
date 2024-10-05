package com.example.demo.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Model.User;
import com.example.demo.Services.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

  @Autowired
  private UserService userService;

  // GET all users (READ all)
  @GetMapping
  public ResponseEntity<List<User>> getAllUsers() {
    List<User> users = userService.getAllUsers();
    return new ResponseEntity<>(users, HttpStatus.OK); // 200 OK
  }

  // GET one user by ID (READ one)
  @GetMapping("/{id}")
  public ResponseEntity<User> getUserById(@PathVariable Long id) {
    Optional<User> user = userService.getUserById(id);
    if (user.isPresent()) {
      return new ResponseEntity<>(user.get(), HttpStatus.OK); // 200 OK
    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 Not Found
  }

  // POST to create a new user (CREATE)
  @PostMapping
  public ResponseEntity<User> createUser(@RequestBody User user) {
    User savedUser = userService.saveUser(user);
    return new ResponseEntity<>(savedUser, HttpStatus.CREATED); // 201 Created
  }

  // PUT to update a user by ID (UPDATE)
  @PutMapping("/{id}")
  public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
    Optional<User> existingUser = userService.getUserById(id);
    if (existingUser.isPresent()) {
      User updatedUser = existingUser.get();
      updatedUser.setFirstName(user.getFirstName());
      updatedUser.setLastName(user.getLastName());
      updatedUser.setPhoneNumber(user.getPhoneNumber());
      updatedUser.setEmail(user.getEmail());
      updatedUser.setAddress(user.getAddress());
      userService.saveUser(updatedUser);
      return new ResponseEntity<>(updatedUser, HttpStatus.OK); // 200 OK
    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 Not Found
  }

  // DELETE a user by ID (DELETE)
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    Optional<User> user = userService.getUserById(id);
    if (user.isPresent()) {
      userService.deleteUser(id);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 Not Found
  }
}
