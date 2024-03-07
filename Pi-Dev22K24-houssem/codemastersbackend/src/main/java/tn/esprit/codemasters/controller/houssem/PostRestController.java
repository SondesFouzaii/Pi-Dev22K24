package tn.esprit.codemasters.controller.houssem;

import io.github.classgraph.Resource;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.codemasters.entity.Post;
import tn.esprit.codemasters.entity.User;
import tn.esprit.codemasters.repository.PostRepository;
import tn.esprit.codemasters.service.houssem.IPostService;
import tn.esprit.codemasters.service.houssem.IUserService;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("post")
public class PostRestController {
    private final IPostService postService;
    private final IUserService userService;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    public PostRestController(IPostService postService, IUserService userService) {
        this.postService = postService;
        this.userService = userService;
    }

  // In your controller
  @PostMapping("/upload-image/{postId}")
  public ResponseEntity<Map<String, String>> uploadImage(@PathVariable Long postId, @RequestParam MultipartFile file) throws IOException {
      postService.addImageToPost(postId, file);
      Map<String, String> response = new HashMap<>();
      response.put("message", "Image uploaded successfully");
      return ResponseEntity.ok(response);
  }
    @GetMapping("/images/{postId}")
    public ResponseEntity<byte[]> getImage(@PathVariable Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new EntityNotFoundException("Post not found"));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG); // Modifier le type de contenu en fonction de votre type d'image

        return ResponseEntity.ok()
                .headers(headers)
                .body(post.getImage());
    }

   /*@GetMapping("/images/{postId}")
    public ResponseEntity<byte[]> getImage(@PathVariable Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new EntityNotFoundException("Post not found"));
        return ResponseEntity.ok(post.getImage());
    }*/
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.findAll();
        return ResponseEntity.ok(posts);
    }
    @GetMapping("/retrieve-all-posts")
    public List<Post> getPosts(@RequestParam("userId") Long userId) {
        // Utilisez l'ID de l'utilisateur pour récupérer les posts associés à cet utilisateur
        return postService.retrieveAllPostsByUser(userId);
    }

    @GetMapping("/retrieve-post/{postId}")
    public Post getPost(@PathVariable("postId") Long id ,@RequestParam("userId") Long userId) {
        User user = userService.retrieveUser(userId);
        return postService.retrievePost(id);
    }
    @PostMapping("/add-post")
    public Post addPost(@RequestBody Post post, @RequestParam("userId") Long userId) {
        User user = userService.retrieveUser(userId);
        if (user != null) {
            post.setUser(user);
            post.setCreationDate(new Date());
            return postService.addPost(post);
        } else {
            // Gérer le cas où l'utilisateur n'est pas trouvé
            // Retourner une erreur appropriée ou effectuer une action alternative
            throw new RuntimeException("Utilisateur non trouvé");
        }
    }

    @PutMapping("/modify-post/{postId}")
    public Post modifyPost(@PathVariable("postId") Long postId, @RequestParam("userId") Long userId, @RequestBody Post updatedPost) {
        User user = userService.retrieveUser(userId);
        if (user != null) {
            Post existingPost = postService.retrievePost(postId);
            if (existingPost != null) {
                existingPost.setUser(user);
                existingPost.setTitle(updatedPost.getTitle());
                existingPost.setContent(updatedPost.getContent());
                existingPost.setCreationDate(new Date());
                return postService.modifyPost(existingPost);
            } else {
                // Gérer le cas où le post n'est pas trouvé
                // Retourner une erreur appropriée ou effectuer une action alternative
                throw new RuntimeException("Post non trouvé");
            }
        } else {
            // Gérer le cas où l'utilisateur n'est pas trouvé
            // Retourner une erreur appropriée ou effectuer une action alternative
            throw new RuntimeException("Utilisateur non trouvé");
        }
    }
    @DeleteMapping("/remove-post/{postId}")
    public void removePost(@PathVariable("postId") Long postId) {
        postService.removePost(postId);
    }


    @PutMapping("/like/{postId}/user/{userId}")
    public ResponseEntity<Post> likedPost(@PathVariable("postId") Long postId, @PathVariable("userId") Long userId) {
        Post likedPost = postService.likedPost(postId, userId);
        return new ResponseEntity<>(likedPost, HttpStatus.ACCEPTED);
    }
    @GetMapping("/search")
    public ResponseEntity<List<Post>> searchPosts(@RequestParam String keyword) {
        List<Post> searchResults = postService.searchPostsByKeyword(keyword);
        return ResponseEntity.ok(searchResults);
    }
}