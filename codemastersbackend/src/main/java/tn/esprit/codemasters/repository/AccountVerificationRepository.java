package tn.esprit.codemasters.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.codemasters.entity.AccountVerification;

public interface AccountVerificationRepository extends JpaRepository<AccountVerification,Long> {
}
