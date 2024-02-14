package tn.esprit.codemasters.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.codemasters.entity.Task;
@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {
}
