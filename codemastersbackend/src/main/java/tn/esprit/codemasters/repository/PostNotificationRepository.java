package tn.esprit.codemasters.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.codemasters.entity.PostNotification;

public interface PostNotificationRepository extends JpaRepository<PostNotification,Long> {
}
