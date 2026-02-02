package com.bloodbank.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "donations")
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User donor;

    private String bloodGroup;
    private String disease; // Any existing disease
    private LocalDate donationDate;
    private String status; // PENDING, APPROVED, REJECTED

    // Location details (auto-filled from user or specific)
    private String city;
    private String district;
}
