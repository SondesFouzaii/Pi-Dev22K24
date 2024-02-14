package tn.esprit.codemasters.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.codemasters.entity.Sprint;
@Repository
public interface SprintRepository extends JpaRepository<Sprint,Long> {
}
