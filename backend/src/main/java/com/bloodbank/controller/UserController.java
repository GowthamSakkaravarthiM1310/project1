package com.bloodbank.controller;

import com.bloodbank.entity.User;
import com.bloodbank.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // GET Mapping to retrieve all users (Data passing: Server -> Client)
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // GET Mapping to retrieve a specific user by ID (Data passing: URL Path
    // Variable -> Server -> Client)
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // GET Mapping to retrieve the currently logged-in user's profile
    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(@AuthenticationPrincipal UserDetails userDetails) {
        return userRepository.findByEmail(userDetails.getUsername())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST Mapping to search users by City (Data passing: Request Body -> Server ->
    // Client)
    @PostMapping("/search")
    public List<User> searchUsers(@RequestBody SearchCriteria criteria) {
        // Simple example: finding all users in a specific city
        // Note: You would typically implement a custom query in UserRepository
        // For now, we filter in memory or assume a basic find (demo purpose)
        return userRepository.findAll().stream()
                .filter(u -> u.getCity() != null && u.getCity().equalsIgnoreCase(criteria.getCity()))
                .toList();
    }

    // Inner class for search data
    public static class SearchCriteria {
        private String city;

        public String getCity() {
            return city;
        }

        public void setCity(String city) {
            this.city = city;
        }
    }
}
