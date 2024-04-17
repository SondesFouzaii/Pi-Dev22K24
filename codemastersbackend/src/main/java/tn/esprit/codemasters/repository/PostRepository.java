package tn.esprit.codemasters.repository;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.codemasters.entity.Post;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {
    List<Post> findByApproved(boolean approved);

    List<Post> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(String title, String content);

    @Query("SELECT p FROM Post p WHERE p.creationDate > :date")
    List<Post> findByCreationDateAfter(@Param("date") LocalDateTime date);

    List<Post> findByUserId(Long userId);
    List<Post> findByContentContainingIgnoreCase(String keyword);
    @Query("select p from Post p where p.user.id = :userId")
    List<Post> findPostsByUserId(@Param("userId") Long userId);
    default Post findByIdOrFail(Long id) {
        return findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + id));
    }
}

