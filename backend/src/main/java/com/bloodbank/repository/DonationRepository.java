package com.bloodbank.repository;

import com.bloodbank.entity.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {
    List<Donation> findByCityOrDistrict(String city, String district);

    List<Donation> findByDonorId(Long userId);
}
