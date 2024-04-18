package tn.esprit.codemasters.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tn.esprit.codemasters.entity.Team;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team,Long> {
    @Query("SELECT t FROM Team t LEFT JOIN t.users u LEFT JOIN t.projects p WHERE " +
            "LOWER(t.name) LIKE LOWER(CONCAT('%',:searchTerm, '%')) OR " +
            "LOWER(u.email) LIKE LOWER(CONCAT('%',:searchTerm, '%')) OR " +
            "LOWER(p.name) LIKE LOWER(CONCAT('%',:searchTerm, '%'))"
    )
    List<Team> searchTeams(@Param("searchTerm") String searchTerm);

    Page<Team> findAll(Pageable pageable);
    List<Team> findAllByOrderByCreatedDateDesc();
    @Query("SELECT COUNT(t) FROM Team t")
    long countTeams();
    @Query("SELECT t.name, SUM(CASE WHEN u.gender = 'Homme' THEN 1 ELSE 0 END) as maleCount, SUM(CASE WHEN u.gender = 'Femme' THEN 1 ELSE 0 END) as femaleCount FROM Team t JOIN t.users u GROUP BY t.name")
    List<Object[]> getGenderCountsByTeam();
    @Query("SELECT " +
            "SUM(CASE WHEN UPPER(TRIM(u.role)) = 'DEVELOPER' THEN 1 ELSE 0 END) AS developers , " +
            "SUM(CASE WHEN UPPER(TRIM(u.role)) = 'PRODUCT_OWNER' THEN 1 ELSE 0 END) AS productOwners, " +
            "SUM(CASE WHEN UPPER(TRIM(u.role)) = 'SCRUM_MASTER' THEN 1 ELSE 0 END) AS scrumMasters " +
            "FROM Team t JOIN t.users u")
    Object[] getTotalRoleCounts();;
    @Query("SELECT t.name AS teamName, COUNT(u) AS userCount, COUNT(p) AS projectCount " +
            "FROM Team t " +
            "LEFT JOIN t.users u " +
            "LEFT JOIN t.projects p " +
            "GROUP BY t.name")
    List<Object[]> findTeamStats();





}
