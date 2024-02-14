package tn.esprit.codemasters.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.codemasters.entity.Evaluation;

public interface EvaluationRepository extends JpaRepository<Evaluation,Long> {
}
