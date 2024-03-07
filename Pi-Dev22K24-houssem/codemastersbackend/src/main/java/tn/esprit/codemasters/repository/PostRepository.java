package tn.esprit.codemasters.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tn.esprit.codemasters.entity.Post;

import java.util.List;

public interface PostRepository extends JpaRepository<Post,Long> {
    List<Post> findByUserId(Long userId);
    List<Post> findByContentContainingIgnoreCase(String keyword);
    @Query("select p from Post p where p.user.id = :userId")
    List<Post> findPostsByUserId(@Param("userId") Long userId);
}
