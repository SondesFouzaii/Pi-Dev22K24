package tn.esprit.codemasters.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tn.esprit.codemasters.entity.Claim;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ClaimRepository extends JpaRepository<Claim,Long> {
    @Query("SELECT c FROM Claim c LEFT JOIN c.user u LEFT JOIN c.userstory us WHERE " +
            "LOWER(c.title) LIKE LOWER(CONCAT('%',:searchTerm, '%')) OR " +
            "LOWER(c.content) LIKE LOWER(CONCAT('%',:searchTerm, '%')) OR " +
            "LOWER(u.email) LIKE LOWER(CONCAT('%',:searchTerm, '%')) OR " +
            "LOWER(us.name) LIKE LOWER(CONCAT('%',:searchTerm, '%'))"
    )
    List<Claim> searchClaims(@Param("searchTerm") String searchTerm);
    Page<Claim> findAll(Pageable pageable);
}
