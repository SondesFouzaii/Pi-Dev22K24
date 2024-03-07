// CommentServiceImpl.java
package tn.esprit.codemasters.service.houssem;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.codemasters.entity.Comment;
import tn.esprit.codemasters.repository.CommentRepository;
import tn.esprit.codemasters.repository.PostRepository;
import tn.esprit.codemasters.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements ICommentService {

    private CommentRepository commentRepository;
    private UserRepository userRepository;
    private PostRepository postRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository, UserRepository userRepository ,PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    @Override
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    @Override
    public Comment getCommentById(Long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        return optionalComment.orElse(null);
    }
    @Transactional
    @Override
    public Comment addcomment(Comment comment,Long idu,Long idp) {
        comment.setUser(userRepository.findById(idu).orElse(null));
        comment.setPost(postRepository.findById(idp).orElse(null));
        comment.setCreatedAt(LocalDateTime.now());
        return commentRepository.save(comment);
    }

    @Override
    public Comment updateComment(Long commentId, Comment comment) {
        Comment existingComment = getCommentById(commentId);
        if (existingComment != null) {
            existingComment.setContent(comment.getContent());
            return commentRepository.save(existingComment);
        }
        return null;
    }

    @Override
    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }
    public void sortCommentsByDate(List<Comment> comments) {
        comments.sort(Comparator.nullsFirst(Comparator.comparing(Comment::getCreatedAt)));
    }
   }