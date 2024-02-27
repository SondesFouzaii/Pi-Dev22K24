package tn.esprit.codemasters.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.codemasters.entity.QuestionOption;

public interface QuestionOptionRepository extends JpaRepository<QuestionOption,Long> {
}
