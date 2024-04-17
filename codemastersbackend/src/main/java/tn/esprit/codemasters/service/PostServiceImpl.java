package tn.esprit.codemasters.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.codemasters.entity.Post;
import tn.esprit.codemasters.entity.User;
import tn.esprit.codemasters.repository.CommentRepository;
import tn.esprit.codemasters.repository.PostRepository;
import tn.esprit.codemasters.repository.UserRepository;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;
/**
 * Service for managing posts.
 */
@Service
@AllArgsConstructor
@Slf4j
public class PostServiceImpl implements IPostService {
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    @Autowired
    UserRepository userRepository;
    /**
     * Filters posts based on a search criteria.
     *
     * @param criteria Search criteria
     * @return List of filtered posts
     */

    @Override
    public List<Post> filterPosts(String criteria) {
        List<Post> allPosts = postRepository.findAll();
        List<Post> filteredPosts = new ArrayList<>();

        for (Post post : allPosts) {
            // Appliquer les critères de filtrage sur les propriétés pertinentes du post
            if (post.getContent().toLowerCase().contains(criteria.toLowerCase())
                    || post.getTitle().toLowerCase().contains(criteria.toLowerCase())) {
                filteredPosts.add(post);
            }
        }

        return sortByDate(filteredPosts);
    }
    /**
     * Adds an image to an existing post.
     *
     * @param postId Identifier of the post
     * @param file   Image file to add
     * @throws IOException               If there is an error reading the file
     * @throws EntityNotFoundException   If the post is not found
     */
    @Transactional
    public void addImageToPost(Long postId, MultipartFile file) throws IOException {
        Post post = postRepository.findById(postId).orElseThrow(() -> new EntityNotFoundException("Post not found"));
        byte[] imageBytes = file.getBytes();
        post.setImage(imageBytes);
        postRepository.save(post);
    }

    @Override
    public List<Post> retrieveAllPosts() {
        List<Post> allPosts = postRepository.findAll();
        return sortByDate(allPosts);
    }
    /**
     * Retrieves all posts.
     *
     * @return List of all posts
     */


    @Override
    public List<Post> findAll() {
        return postRepository.findAll();
    }

    /**
     * Retrieves a post by its identifier.
     *
     * @param postId Identifier of the post
     * @return The corresponding post, or null if it doesn't exist
     */
    @Override
    public Post retrievePost(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        return optionalPost.orElse(null);
    }

    /**
     * Adds a new post.
     *
     * @param post Post to add
     * @return The added post
     */
    @Override
    public Post addPost(Post post) {
        post.setCreationDate(new Date());
        return postRepository.save(post);
    }
    @Override
    public Post getPostById(Long id) {
        // Logique pour récupérer la publication par ID
        return postRepository.findById(id).orElse(null);
    }
    @Override
    public Post savePost(Post post) {
        // Logique pour enregistrer la publication
        return postRepository.save(post);
    }
    /**
     * Removes a post.
     *
     * @param postId Identifier of the post to remove
     */
    public void removePost(Long postId) {
        Post post = postRepository.findByIdOrFail(postId);
        commentRepository.deleteInBatch(post.getComments());
        postRepository.delete(post);
    }
    /**
     * Modifies an existing post.
     *
     * @param post Modified post
     * @return The modified post
     */

    @Override
    public Post modifyPost(Post post) {
        return postRepository.save(post);
    }
    /**
     * Likes or unlikes a post.
     *
     * @param postId Identifier of the post
     * @param userId Identifier of the user
     * @return The updated post
     */
    @Override
    public Post likedPost(Long postId, Long userId) {
        Post existingPost = retrievePost(postId);
        User existingUser = userRepository.findById(userId).get();

        existingPost.setLiked(existingPost.getLiked() != null ? existingPost.getLiked() : new ArrayList<>());

        // if already liked, then remove the user from the list which is equivalent to
        // disliking the post
        if (existingPost.getLiked().contains(existingUser)) {
            existingPost.getLiked().remove(existingUser);
            return postRepository.save(existingPost);
        }
        // like the post
        existingPost.getLiked().add(existingUser);

        return postRepository.save(existingPost);
    }
    /**
     * Retrieves all posts by a user.
     *
     * @param userId Identifier of the user
     * @return List of posts by the user
     */

    @Override
    public List<Post> retrieveAllPostsByUser(Long userId) {
        List<Post> posts = postRepository.findByUserId(userId);
        //log.error(posts.get(0).getLiked().size() + "");
        return posts;
    }

    public List<Post> searchPosts(String query) {
        // Convertir la chaîne de requête en objet de date si nécessaire
        // Supposons que la chaîne de requête soit une date au format ISO 8601
        LocalDateTime date;
        try {
            date = LocalDateTime.parse(query, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        } catch (DateTimeParseException e) {
            date = null; // La chaîne de requête n'est pas une date valide
        }

        if (date != null) {
            // Recherche par date de création
            return postRepository.findByCreationDateAfter(date);
        } else {
            // Recherche par titre ou contenu
            return postRepository.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(query, query);
        }
    }
    @Override
    public List<Post> searchPostsByKeyword(String keyword) {
        return postRepository.findByContentContainingIgnoreCase(keyword);
    }
    /**
     * Sorts a list of posts by creation date (from newest to oldest).
     *
     * @param posts List of posts to sort
     * @return List of posts sorted by creation date
     */
    @Override
    public List<Post> sortByDate(List<Post> posts) {
        // Tri des posts par date
        posts.sort(Comparator.comparing(Post::getCreationDate).reversed());
        return posts;
    }



    public Post findById(Long id) {
        return postRepository.findById(id).orElse(null);
    }

    public void save(Post post) {
        postRepository.save(post);
    }

    @Override
    public List<Post> findAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public List<Post> findAllApprovedPosts() {
        return postRepository.findByApproved(true);
    }

}
