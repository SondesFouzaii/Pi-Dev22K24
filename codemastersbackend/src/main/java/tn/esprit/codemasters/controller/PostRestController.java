package tn.esprit.codemasters.controller;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.codemasters.entity.Post;
import tn.esprit.codemasters.entity.User;
import tn.esprit.codemasters.repository.PostRepository;
import tn.esprit.codemasters.service.IPostService;
import tn.esprit.codemasters.service.IUserService;


import java.io.IOException;
import java.util.*;
/**
 * REST controller for managing posts.
 */
@RestController
@RequestMapping("post")
public class PostRestController {
    /**
     * Service for post management.
     */
    private final IPostService postService;
    private final IUserService userService;

    @Autowired
    private PostRepository postRepository;



    /**
     * Constructor for the controller.
     *
     * @param postService Service for post management.
     * @param userService Service for user management.
     */

    @Autowired
    public PostRestController(IPostService postService, IUserService userService) {
        this.postService = postService;
        this.userService = userService;
    }

    /**
     * Sorts posts by date.
     *
     * @return Sorted list of posts.
     */
    @GetMapping("/sort-by-date")
    public ResponseEntity<List<Post>> sortPostsByDate() {
        List<Post> sortedPosts = postService.sortByDate(postService.findAll());
        return ResponseEntity.ok(sortedPosts);
    }

    /**
     * Uploads an image for a post.
     *
     * @param postId ID of the post.
     * @param file   Image file to upload.
     * @return Response indicating the success of the image upload.
     * @throws IOException If there is an error handling the file.
     */
    @PostMapping("/upload-image/{postId}")
    public ResponseEntity<Map<String, String>> uploadImage(@PathVariable Long postId, @RequestParam MultipartFile file) throws IOException {
        postService.addImageToPost(postId, file);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Image uploaded successfully");
        return ResponseEntity.ok(response);
    }

    /**
     * Retrieves the image for a post.
     *
     * @param postId ID of the post.
     * @return Response containing the image data.
     */
    @GetMapping("/images/{postId}")
    public ResponseEntity<byte[]> getImage(@PathVariable Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new EntityNotFoundException("Post not found"));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG); // Modifier le type de contenu en fonction de votre type d'image

        return ResponseEntity.ok()
                .headers(headers)
                .body(post.getImage());
    }

    /**
     * Retrieves all posts.
     *
     * @return List of all posts.
     */
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.findAll();
        // Tri des posts par date
        posts.sort(Comparator.comparing(Post::getCreationDate).reversed());
        return ResponseEntity.ok(posts);
    }

    /**
     * Retrieves posts associated with a user.
     *
     * @param userId ID of the user.
     * @return List of posts associated with the user.
     */
    @GetMapping("/retrieve-all-posts")
    public List<Post> getPosts(@RequestParam("userId") Long userId) {
        // Utilisez l'ID de l'utilisateur pour récupérer les posts associés à cet utilisateur
        return postService.retrieveAllPostsByUser(userId);
    }

    /**
     * Retrieves a post by its ID.
     *
     * @param id     ID of the post.
     * @param userId ID of the user.
     * @return The requested post.
     */
    @GetMapping("/retrieve-post/{postId}")
    public Post getPost(@PathVariable("postId") Long id, @RequestParam("userId") Long userId) {
        User user = userService.retrieveUser(userId);
        return postService.retrievePost(id);
    }

    /**
     * Filters posts based on a criteria.
     *
     * @param criteria Filtering criteria.
     * @return Filtered list of posts.
     */
    @GetMapping("/filter")
    public ResponseEntity<List<Post>> filterPosts(@RequestParam(value = "criteria") String criteria) {
        List<Post> filteredPosts = postService.filterPosts(criteria);
        return ResponseEntity.ok(filteredPosts);
    }

    /**
     * Adds a new post.
     *
     * @param post   Post to add.
     * @param userId ID of the user.
     * @return The added post.
     */

   @PostMapping("/add-post")
    public Post addPost(@RequestBody Post post, @RequestParam("userId") Long userId) {


        User user = userService.retrieveUser(userId);
        if (user != null) {
            post.setUser(user);
            post.setCreationDate(new Date());
            return postService.addPost(post);
        } else {
            throw new RuntimeException("Utilisateur non trouvé");
        }
    }


    /**
     * Modifies an existing post.
     *
     * @param postId      ID of the post to modify.
     * @param userId      ID of the user.
     * @param updatedPost Updated post data.
     * @return The modified post.
     */
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
                throw new RuntimeException("Post non trouvé");
            }
        } else {
            throw new RuntimeException("Utilisateur non trouvé");
        }
    }

    /**
     * Removes a specific post.
     *
     * @param postId ID of the post to remove.
     */

    @DeleteMapping("/remove-post/{postId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removePost(@PathVariable("postId") Long postId) {
        postService.removePost(postId);
    }

    /**
     * Exception handler for runtime exceptions.
     *
     * @param ex The thrown exception.
     */
    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public void handleRuntimeException(RuntimeException ex) {
    }

    /**
     * Likes a specific post.
     *
     * @param postId ID of the post to like.
     * @param userId ID of the user.
     * @return The liked post.
     */
    @PutMapping("/like/{postId}/user/{userId}")
    public ResponseEntity<Post> likedPost(@PathVariable("postId") Long postId, @PathVariable("userId") Long userId) {
        Post likedPost = postService.likedPost(postId, userId);
        return new ResponseEntity<>(likedPost, HttpStatus.ACCEPTED);
    }


   /* @GetMapping("/search")
    public ResponseEntity<List<Post>> searchPosts(@RequestParam String keyword) {
        List<Post> searchResults = postService.searchPostsByKeyword(keyword);
        return ResponseEntity.ok(searchResults);
    }
*/
    @GetMapping("/search")
    public ResponseEntity<List<Post>> searchPosts(@RequestParam("query") String query) {
        List<Post> posts = postService.searchPosts(query);
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/approved")
    public ResponseEntity<List<Post>> getApprovedPosts() {
        List<Post> approvedPosts = postService.findAllApprovedPosts();
        return ResponseEntity.ok(approvedPosts);
    }

    @PutMapping("/{postId}/approve")
    public ResponseEntity<Post> approvePost(@PathVariable("postId") Long postId) {
        Post post = postService.retrievePost(postId);
        if (post != null) {
            post.setApproved(true);
            Post approvedPost = postService.modifyPost(post);
            return ResponseEntity.ok(approvedPost);
        } else {
            throw new EntityNotFoundException("Post not found");
        }
    }
}




