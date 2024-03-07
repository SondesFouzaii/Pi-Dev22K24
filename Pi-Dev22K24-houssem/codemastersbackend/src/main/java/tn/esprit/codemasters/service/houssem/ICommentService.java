// ICommentService.java
package tn.esprit.codemasters.service.houssem;


import tn.esprit.codemasters.entity.Comment;

import java.util.List;

public interface ICommentService {
    List<Comment> getAllComments();
    Comment getCommentById(Long commentId);
    Comment addcomment(Comment comment,Long userId ,Long postId);
    Comment updateComment(Long commentId, Comment comment);
    void deleteComment(Long commentId);
   void sortCommentsByDate(List<Comment> comments);
}