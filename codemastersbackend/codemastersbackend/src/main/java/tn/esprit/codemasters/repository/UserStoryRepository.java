package tn.esprit.codemasters.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.codemasters.entity.UserStory;

import java.util.List;

public interface UserStoryRepository extends JpaRepository<UserStory,Long> {
   // List<UserStory> findByProjectId(Long projectId);
}
