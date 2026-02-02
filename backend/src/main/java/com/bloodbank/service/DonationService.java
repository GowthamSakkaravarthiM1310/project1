package com.bloodbank.service;

import com.bloodbank.entity.Donation;
import com.bloodbank.entity.User;
import com.bloodbank.repository.DonationRepository;
import com.bloodbank.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DonationService {

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private UserRepository userRepository;

    public Donation createDonation(Donation donation, String email) {
        User donor = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        donation.setDonor(donor);
        donation.setDonationDate(LocalDate.now());
        donation.setStatus("PENDING");

        // Auto-fill location from donor if not provided (optional logic)
        if (donation.getCity() == null || donation.getCity().isEmpty()) {
            donation.setCity(donor.getCity());
        }

        return donationRepository.save(donation);
    }

    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }

    public List<Donation> getDonationsByDonor(String email) {
        User donor = userRepository.findByEmail(email).orElseThrow();
        return donationRepository.findByDonorId(donor.getId());
    }
}
