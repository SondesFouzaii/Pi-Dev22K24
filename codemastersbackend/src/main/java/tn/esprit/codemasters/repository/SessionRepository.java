package tn.esprit.codemasters.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.codemasters.entity.Card;
import tn.esprit.codemasters.entity.Session;

import java.util.List;

@Repository
public interface SessionRepository extends JpaRepository<Session,Long> {
    List<Session> findByName(String name);
}
