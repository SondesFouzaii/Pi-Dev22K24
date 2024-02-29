package tn.esprit.codemasters.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.codemasters.entity.UserStory;

@Repository
public interface UserStoryRepository extends JpaRepository<UserStory,Long> {
}
