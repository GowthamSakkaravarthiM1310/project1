package com.bloodbank.controller;

import com.bloodbank.entity.BloodRequest;
import com.bloodbank.service.BloodRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class BloodRequestController {

    @Autowired
    private BloodRequestService requestService;

    @PostMapping
    public BloodRequest createRequest(@RequestBody BloodRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return requestService.createRequest(request, userDetails.getUsername());
    }

    @GetMapping("/my")
    public List<BloodRequest> getMyRequests(@AuthenticationPrincipal UserDetails userDetails) {
        return requestService.getRequestsByHospital(userDetails.getUsername());
    }

    // Accessible eventually only by BLOOD_BANK role
    @GetMapping("/all")
    public List<BloodRequest> getAllRequests() {
        return requestService.getAllRequests();
    }
}
