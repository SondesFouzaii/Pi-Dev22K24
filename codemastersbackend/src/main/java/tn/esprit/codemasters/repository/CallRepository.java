package tn.esprit.codemasters.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.codemasters.entity.user.CallUser;

public interface CallRepository extends JpaRepository<CallUser,Long> {
}
