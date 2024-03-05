package tn.esprit.codemasters.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.codemasters.entity.Session;

import java.util.List;

public interface SessionRepository extends JpaRepository<Session,Long> {
    List<Session> findByProjectId(long idProject);

    Session findByCode(Integer code);
}
