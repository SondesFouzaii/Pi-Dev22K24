package tn.esprit.codemasters.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tn.esprit.codemasters.entity.Project;

import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project,Long> {
    @Query("SELECT COUNT(p) FROM Project p WHERE p.team IS NOT NULL")
    long countProjectsInTeams();
    Optional<Project> findByName(String name);

}
