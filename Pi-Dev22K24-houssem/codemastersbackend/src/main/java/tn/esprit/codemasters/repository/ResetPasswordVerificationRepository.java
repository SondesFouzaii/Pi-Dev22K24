package tn.esprit.codemasters.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.codemasters.entity.ResetPasswordVerification;

public interface ResetPasswordVerificationRepository extends JpaRepository<ResetPasswordVerification,Long> {
}
