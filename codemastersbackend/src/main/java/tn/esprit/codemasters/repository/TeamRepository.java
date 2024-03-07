package tn.esprit.codemasters.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tn.esprit.codemasters.entity.Team;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team,Long> {

    @Query("SELECT t FROM Team t LEFT JOIN t.users u LEFT JOIN t.projects p WHERE " +
            "LOWER(t.name) LIKE LOWER(CONCAT('%',:searchTerm, '%')) OR " +
            "LOWER(u.name) LIKE LOWER(CONCAT('%',:searchTerm, '%')) OR " +
            "LOWER(u.email) LIKE LOWER(CONCAT('%',:searchTerm, '%')) OR " +
            "LOWER(p.name) LIKE LOWER(CONCAT('%',:searchTerm, '%'))"
    )
    List<Team> searchTeams(@Param("searchTerm") String searchTerm);



}
