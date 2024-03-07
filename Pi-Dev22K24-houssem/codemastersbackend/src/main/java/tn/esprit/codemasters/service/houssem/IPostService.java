package tn.esprit.codemasters.service.houssem;

import org.springframework.web.multipart.MultipartFile;
import tn.esprit.codemasters.entity.Post;
import tn.esprit.codemasters.entity.User;

import java.io.IOException;
import java.util.List;

public interface IPostService {
    List<Post> retrieveAllPosts();
    Post retrievePost(Long postId);
    Post addPost(Post post);
    void removePost(Long postId);
    Post modifyPost(Post post);
    //void likePost(Long postId, User user);
    //void dislikePost(Long postId, User user);
    Post likedPost(Long postId, Long userId);
    List<Post> retrieveAllPostsByUser(Long userId);
    List<Post> searchPostsByKeyword(String keyword);
    public List<Post> findAll();
    void addImageToPost(Long postId, MultipartFile file) throws IOException;


}