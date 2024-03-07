// CommentController.java
package tn.esprit.codemasters.controller.houssem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.codemasters.entity.Comment;
import tn.esprit.codemasters.service.houssem.ICommentService;
import tn.esprit.codemasters.service.houssem.IPostService;
import tn.esprit.codemasters.service.houssem.IUserService;

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

    /*@GetMapping
    public ResponseEntity<List<Comment>> getAllComments() {
        List<Comment> comments = commentService.getAllComments();
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }*/
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
        Comment updatedComment = commentService.updateComment(commentId, comment);
        if (updatedComment != null) {
            return new ResponseEntity<>(updatedComment, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }





}