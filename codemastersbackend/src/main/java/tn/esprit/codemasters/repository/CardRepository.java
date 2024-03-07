package tn.esprit.codemasters.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.codemasters.entity.Card;

import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card,Long> {
    List<Card> findByName(String name);
}
