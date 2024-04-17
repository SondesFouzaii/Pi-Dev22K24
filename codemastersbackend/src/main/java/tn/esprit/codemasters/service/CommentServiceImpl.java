// CommentServiceImpl.java
package tn.esprit.codemasters.service;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;
import tn.esprit.codemasters.entity.*;
import tn.esprit.codemasters.repository.CommentRepository;
import tn.esprit.codemasters.repository.PostRepository;
import tn.esprit.codemasters.repository.ReplyRepository;
import tn.esprit.codemasters.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements ICommentService {

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private NotificationServiceImpl notificationService;

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private ReplyRepository replyRepository;

    @Override
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }



    public List<Reply> getRepliesForComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new NotFoundException("Comment not found with id: " + commentId));

        return replyRepository.findByComment(comment);
    }

    @Override
    public Comment getCommentById(Long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        return optionalComment.orElse(null);
    }

   @Override
   @Transactional
   public Comment addcomment(Comment comment, Long idu, Long idp) {
       User u = userRepository.findById(idu).orElse(null);
       Post p = postRepository.findById(idp).orElse(null);
       comment.setUser(u);
       comment.setPost(p);
       comment.setCreatedAt(LocalDateTime.now());

       // Filtrer les mots offensants dans le contenu du commentaire
       String filteredContent = filterBadWords(comment.getContent());
       comment.setContent(filteredContent);

       Comment tempComment =  commentRepository.save(comment);
       Notification notif = new Notification().builder()
               .title("Comment")
               .message("New comment in post: " + p.getTitle() +
                       " " + p.getUser().getFirst_name() +
                       " " + p.getUser().getLast_name())
               .build();
       this.notificationService.sendNotification(u,notif);
       return tempComment;
   }

    /*@Override
    public Comment updateComment(Long commentId, Comment comment) {
        Comment existingComment = getCommentById(commentId);
        if (existingComment != null) {
            existingComment.setContent(comment.getContent());
            return commentRepository.save(existingComment);
        }
        return null;
    }
*/
    @Override
    @Transactional
    public Comment updateComment(Long commentId, Comment comment) {
        Comment existingComment = getCommentById(commentId);
        if (existingComment != null) {
            existingComment.setContent(comment.getContent());

            // Filtrer les mots offensants dans le contenu du commentaire
            String filteredContent = filterBadWords(existingComment.getContent());
            existingComment.setContent(filteredContent);

            return commentRepository.save(existingComment);
        }
        return null;
    }
 /* @Transactional
  public void deleteComment(Long commentId) {
      Comment comment = entityManager.find(Comment.class, commentId);

      if (comment != null) {
          // Détache le commentaire de l'utilisateur et du post
          comment.setUser(null);
          comment.setPost(null);
          comment.setReplies(null);

          entityManager.remove(comment);
      }

  }*/
 // CommentService.java
 @Transactional
 public void deleteComment(Long commentId) {
     Comment comment = commentRepository.findById(commentId)
             .orElseThrow(() -> new NotFoundException("Comment not found with id: " + commentId));

     // Récupérer toutes les réponses associées au commentaire
     List<Reply> replies = replyRepository.findByComment(comment);

     // Supprimer les réponses associées une par une
     for (Reply reply : replies) {
         replyRepository.delete(reply);
     }

     // Enfin, supprimer le commentaire lui-même
     commentRepository.delete(comment);
 }


    public void sortCommentsByDate(List<Comment> comments) {
        comments.sort(Comparator.nullsFirst(Comparator.comparing(Comment::getCreatedAt)));
    }
    private static final List<String> badWords = Arrays.asList("badword1", "badword2", "badword3");

    public String filterBadWords(String content) {
        for (String word : badWords) {
            content = content.replaceAll("(?i)" + word, "***"); // Remplace le mot offensant par ***
        }
        return content;
    }

    @Override
    @Transactional
    public Reply addReplyComment(Reply replyComment, Long commentId) {
        Comment comment = commentRepository.findById(commentId).orElse(null);
        User user = userRepository.findById(replyComment.getUser().getId()).orElse(null);
        replyComment.setComment(comment);
        replyComment.setUser(user);
        replyComment.setCreatedAt(LocalDateTime.now());

        // Filtrer les mots offensants dans le contenu de la réponse
        String filteredContent = filterBadWords(replyComment.getContent());
        replyComment.setContent(filteredContent);

        return replyRepository.save(replyComment);
    }
    @Override
    @Transactional
    public void deleteReplyComment(Long replyId) {
        replyRepository.deleteById(replyId);
    }
}