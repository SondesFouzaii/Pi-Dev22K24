// CommentController.java
package tn.esprit.codemasters.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.webjars.NotFoundException;
import tn.esprit.codemasters.entity.Comment;
import tn.esprit.codemasters.entity.Reply;
import tn.esprit.codemasters.entity.User;
import tn.esprit.codemasters.service.ICommentService;
import tn.esprit.codemasters.service.IPostService;
import tn.esprit.codemasters.service.IUserService;


import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    private ICommentService commentService;
    private IUserService userService;
    private IPostService postService;

    @Autowired
    public CommentController(ICommentService commentService, IUserService userService , IPostService postService) {
        this.commentService = commentService;
        this.userService = userService;
        this.postService =postService;
    }


    @GetMapping
    public ResponseEntity<List<Comment>> getAllComments(@RequestParam(required = false) String sortBy) {
        List<Comment> comments = commentService.getAllComments();

        if (sortBy == null || !sortBy.equals("date")) {
            commentService.sortCommentsByDate(comments);
        }

        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    @GetMapping("/{commentId}")
    public ResponseEntity<Comment> getCommentById(@PathVariable Long commentId) {
        Comment comment = commentService.getCommentById(commentId);
        if (comment != null) {
            return new ResponseEntity<>(comment, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @PostMapping("/add-comment")
    public Comment addComment(@RequestBody Comment comment, @RequestParam Long idu, @RequestParam Long idp) {

        return commentService.addcomment(comment, idu, idp);
    }

 @PutMapping("/{commentId}")
 public ResponseEntity<Comment> updateComment(@PathVariable Long commentId, @RequestBody Comment comment) {
     // Filtrer le contenu du commentaire
     String filteredContent = commentService.filterBadWords(comment.getContent());
     comment.setContent(filteredContent);

     // Mettre à jour le commentaire
     Comment updatedComment = commentService.updateComment(commentId, comment);
     if (updatedComment != null) {
         return new ResponseEntity<>(updatedComment, HttpStatus.OK);
     }
     return new ResponseEntity<>(HttpStatus.NOT_FOUND);
 }
 /*
  @DeleteMapping("/{commentId}")
  public void deleteComment(@PathVariable Long commentId) {
      Comment comment = commentService.getCommentById(commentId);

      if (comment != null) {
          // Détache le commentaire du post et de l'utilisateur
          comment.setPost(null);
          comment.setUser(null);
          comment.setReplies(null);

          commentService.deleteComment(commentId);
      }
  }
*/
 @DeleteMapping("/{commentId}")
 public ResponseEntity<?> deleteComment(@PathVariable Long commentId) {
     try {
         commentService.deleteComment(commentId);
         return ResponseEntity.ok().build();
     } catch (Exception e) {
         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Une erreur s'est produite lors de la suppression du commentaire.");
     }
 }



    @PostMapping("/{commentId}/{userId}")
    public ResponseEntity<Reply> addReplyComment(@PathVariable Long commentId, @PathVariable Long userId, @RequestBody Reply replyComment) {
        Comment comment = commentService.getCommentById(commentId);
        User user = userService.retrieveUser(userId);

        if (comment == null || user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        replyComment.setComment(comment);
        replyComment.setUser(user);
        Reply addedReply = commentService.addReplyComment(replyComment, commentId);
        return new ResponseEntity<>(addedReply, HttpStatus.CREATED);
    }

    @GetMapping("/{commentId}/replies")
    public ResponseEntity<List<Reply>> getRepliesForComment(@PathVariable Long commentId) {
        List<Reply> replies = commentService.getRepliesForComment(commentId);
        return ResponseEntity.ok(replies);
    }

    @DeleteMapping("/replies/{replyId}")
    public ResponseEntity<Void> deleteReply(@PathVariable Long replyId) {
        try {

            commentService.deleteReplyComment(replyId);
            return ResponseEntity.noContent().build();
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

}