package tn.esprit.codemasters.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.codemasters.entity.User;

public interface UserRepository extends JpaRepository<User,Long> {
}
