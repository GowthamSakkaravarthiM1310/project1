package com.bloodbank.controller;

import com.bloodbank.entity.Donation;
import com.bloodbank.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donations")
public class DonationController {

    @Autowired
    private DonationService donationService;

    @PostMapping
    public Donation createDonation(@RequestBody Donation donation, @AuthenticationPrincipal UserDetails userDetails) {
        return donationService.createDonation(donation, userDetails.getUsername());
    }

    @GetMapping("/my")
    public List<Donation> getMyDonations(@AuthenticationPrincipal UserDetails userDetails) {
        return donationService.getDonationsByDonor(userDetails.getUsername());
    }

    // Accessible eventually only by BLOOD_BANK role
    @GetMapping("/all")
    public List<Donation> getAllDonations() {
        return donationService.getAllDonations();
    }
}
