package tn.esprit.codemasters.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tn.esprit.codemasters.entity.user.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    User getUserByEmail(String email);
    User getUserByBarrcode(String barrcode);
    User getUserByEmailAndPassword(String email,String password);
    Optional<User> findByEmail(String email);
    @Query("SELECT COUNT(u) FROM User u join u.teams t where  t IS NOT NULL")
    long countUsersInTeams();
    @Query("SELECT " +
            "    COUNT(CASE WHEN UPPER(TRIM(u.role)) = 'DEVELOPER' THEN 1 END) AS developers, " +
            "    COUNT(CASE WHEN UPPER(TRIM(u.role)) = 'PRODUCT_OWNER' THEN 1 END) AS productOwners, " +
            "    COUNT(CASE WHEN UPPER(TRIM(u.role)) = 'SCRUM_MASTER' THEN 1 END) AS scrumMasters " +
            "FROM\n" +
            "    User u" +
            "    JOIN u.teams t " +
            "WHERE t IS NOT NULL " )
    Long[] getTotalRoleCounts();



}
