package tn.esprit.codemasters.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.codemasters.entity.quiz.UserTest;

import java.util.List;

public interface UserTestRepository extends JpaRepository<UserTest,Long> {
    public List<UserTest> findByTestIdOrderByScoreDesc(Long id);
}
