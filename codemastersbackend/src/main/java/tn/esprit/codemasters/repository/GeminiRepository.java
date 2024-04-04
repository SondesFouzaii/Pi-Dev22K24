package tn.esprit.codemasters.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.codemasters.entity.quiz.Gemini;

public interface GeminiRepository extends JpaRepository<Gemini,Long> {
}
