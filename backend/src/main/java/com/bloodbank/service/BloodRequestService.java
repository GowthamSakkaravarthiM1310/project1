package com.bloodbank.service;

import com.bloodbank.entity.BloodRequest;
import com.bloodbank.entity.User;
import com.bloodbank.repository.BloodRequestRepository;
import com.bloodbank.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BloodRequestService {

    @Autowired
    private BloodRequestRepository requestRepository;

    @Autowired
    private UserRepository userRepository;

    public BloodRequest createRequest(BloodRequest request, String email) {
        User hospital = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        request.setHospital(hospital);
        request.setRequestDate(LocalDate.now());
        request.setStatus("PENDING");

        if (request.getCity() == null || request.getCity().isEmpty()) {
            request.setCity(hospital.getCity());
        }

        return requestRepository.save(request);
    }

    public List<BloodRequest> getAllRequests() {
        return requestRepository.findAll();
    }

    public List<BloodRequest> getRequestsByHospital(String email) {
        User hospital = userRepository.findByEmail(email).orElseThrow();
        return requestRepository.findByHospitalId(hospital.getId());
    }
}
