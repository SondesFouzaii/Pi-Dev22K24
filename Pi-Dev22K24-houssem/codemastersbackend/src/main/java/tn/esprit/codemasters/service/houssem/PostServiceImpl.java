package tn.esprit.codemasters.service.houssem;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.codemasters.entity.Post;
import tn.esprit.codemasters.entity.User;
import tn.esprit.codemasters.repository.CommentRepository;
import tn.esprit.codemasters.repository.PostRepository;
import tn.esprit.codemasters.repository.UserRepository;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PostServiceImpl implements IPostService {
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    @Autowired
    UserRepository userRepository;


   @Transactional
   public void addImageToPost(Long postId, MultipartFile file) throws IOException {
       Post post = postRepository.findById(postId).orElseThrow(() -> new EntityNotFoundException("Post not found"));
       byte[] imageBytes = file.getBytes();
       post.setImage(imageBytes);
       postRepository.save(post);
   }
    @Override
    public List<Post> retrieveAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public List<Post> findAll() {
        return postRepository.findAll();
    }

    @Override
    public Post retrievePost(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        return optionalPost.orElse(null);
    }

    @Override
    public Post addPost(Post post) {
        post.setCreationDate(new Date());
        return postRepository.save(post);
    }


    public void removePost(Long postId) {
        Post post = postRepository.findById(postId).orElse(null);

        if (post != null) {
            commentRepository.deleteAll(post.getComments());
            postRepository.delete(post);
        } else {
            throw new RuntimeException("Post introuvable");
        }
    }


    @Override
    public Post modifyPost(Post post) {
        return postRepository.save(post);
    }

    @Override
    public Post likedPost(Long postId, Long userId) {
        Post existingPost = retrievePost(postId);
        User existingUser = userRepository.findById(userId).get();

        // if already liked, then remove the user from the list which is equivalent to
        // disliking the post
        if (existingPost.getliked().contains(existingUser)) {
            existingPost.getliked().remove(existingUser);
            return postRepository.save(existingPost);
        }
        // like the post
        existingPost.getliked().add(existingUser);
        return postRepository.save(existingPost);
    }


    @Override
    public List<Post> retrieveAllPostsByUser(Long userId) {
        return postRepository.findByUserId(userId);
    }



   @Override
    public List<Post> searchPostsByKeyword(String keyword) {
        return postRepository.findByContentContainingIgnoreCase(keyword);
    }
}
