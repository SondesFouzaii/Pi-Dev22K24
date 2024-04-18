package tn.esprit.codemasters.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.codemasters.entity.quiz.Test;

public interface TestRepository extends JpaRepository<Test,Long> {
}
