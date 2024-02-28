package tn.esprit.codemasters.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.codemasters.entity.Task;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {
    //List<Task> findByStatus(Task.TaskStat status);
    List<Task> findByStatusAndUserstoryId(Task.TaskStat status,long UserStoryId);

}
