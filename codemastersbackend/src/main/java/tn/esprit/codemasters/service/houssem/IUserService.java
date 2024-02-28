package tn.esprit.codemasters.service.houssem;

import org.springframework.http.ResponseEntity;
import tn.esprit.codemasters.entity.Comment;
import tn.esprit.codemasters.entity.User;

import java.util.List;

public interface IUserService {
    public String addSimpleUser(User simpleuser);
    public String addUser(User advanceduser);
    public ResponseEntity<String> findbyemailandpassword(String email, String password);
    public User retrieveUser(Long userid);
    public String updateUser(User user);
    public String updatepersonalinformations(User user);
    public String updatePWDUser(Long userid,String pwd);
    public String updateImgUser(Long userid,String image);
    public List<User> retrieveAllUsers();
    public void blockunblock(Long userid);
    public void modifyRole(Long userid,User.Role role);
    public String resetpwd(String email);
    public boolean verifyaccount(String code);
    public Comment addcomment(Comment comment,Long idu,Long idp);
}
