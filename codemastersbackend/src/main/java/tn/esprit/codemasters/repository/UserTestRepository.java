package tn.esprit.codemasters.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.codemasters.entity.quiz.UserTest;

public interface UserTestRepository extends JpaRepository<UserTest,Long> {
}
