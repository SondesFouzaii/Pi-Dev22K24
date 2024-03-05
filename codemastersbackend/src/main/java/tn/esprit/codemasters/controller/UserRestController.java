package tn.esprit.codemasters.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.codemasters.entity.Comment;
import tn.esprit.codemasters.entity.User;
import tn.esprit.codemasters.service.houssem.IUserService;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("user")
public class UserRestController {
    @Autowired
    IUserService userService;

    @GetMapping("/retrieve-all-users")
    public List<User> getusers() {
        return userService.retrieveAllUsers();
    }
    @GetMapping("/retrieve-user/{id}")
    public User getuser(@PathVariable Long id) {
        return userService.retrieveUser(id);
    }
    @PostMapping("/add-simple-user")
    public String addSimpleUser(@RequestBody User user) {
        return userService.addSimpleUser(user);
    }
    @PostMapping("/add-user")
    public String addUser(@RequestBody User user) {
        return userService.addUser(user);
    }
    @GetMapping("/authentification")
    public ResponseEntity<String> addUser(@RequestParam String email, @RequestParam String password) {
        return userService.findbyemailandpassword(email, password);
    }
    @GetMapping("/updateaccount")
    public String updateUser(User user) {
        return userService.updatepersonalinformations(user);
    }

    @GetMapping("/getpassword/{email}")
    public String resetpwd(@PathVariable String email) {
        return userService.resetpwd(email);
    }

    @PutMapping("/modify-role/{UserId}/{role}")
    public void modifyRole(@PathVariable("UserId") Long UserId,@PathVariable("role") User.Role role) {
         userService.modifyRole(UserId, role);
    }

    @PutMapping("/modify-img/{UserId}/{img}")
    public String modifyimg(@PathVariable("UserId") Long UserId,@PathVariable("img") String img) {
        String image= "assets/img/"+img;
        return userService.updateImgUser(UserId, image);
    }

    @PutMapping("/bloquer-debloquer/{UserId}")
    public void bloquerdebloquer(@PathVariable("UserId") Long UserId) {
        userService.blockunblock(UserId);
    }

    @GetMapping("/genders")
    public List<User.Gender> getGenders() {
        return Arrays.asList(User.Gender.values());
    }

    @GetMapping("/roles")
    public List<User.Role> getRoles() {
        return Arrays.asList(User.Role.values());
    }

    @DeleteMapping("/remove-user/{id}")
    public void deleteuser(@PathVariable Long id) {
        userService.removeaccount(id);
    }

}