package tn.esprit.codemasters.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.codemasters.entity.Question;

public interface QuestionRepository extends JpaRepository<Question,Long> {
}
