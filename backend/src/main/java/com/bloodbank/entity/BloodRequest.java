package com.bloodbank.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "blood_requests")
public class BloodRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User hospital;

    private String patientName;
    private String bloodGroup; // Required blood group
    private int units;
    private String status; // PENDING, FULFILLED
    private LocalDate requestDate;

    // Location details
    private String city;
    private String district;
}
