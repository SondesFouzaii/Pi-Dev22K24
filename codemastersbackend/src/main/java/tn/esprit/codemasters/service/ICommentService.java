// ICommentService.java
package tn.esprit.codemasters.service;


import tn.esprit.codemasters.entity.Comment;
import tn.esprit.codemasters.entity.Reply;

import java.util.List;

public interface ICommentService {
    List<Comment> getAllComments();
    Comment getCommentById(Long commentId);
    Comment addcomment(Comment comment,Long userId ,Long postId);
    Comment updateComment(Long commentId, Comment comment);
    void deleteComment(Long commentId);
   void sortCommentsByDate(List<Comment> comments);
    public String filterBadWords(String content);
    //Comment saveComment(Comment comment);
    Reply addReplyComment(Reply replyComment, Long commentId);
    public List<Reply> getRepliesForComment(Long commentId);
    public void deleteReplyComment(Long replyId);
}