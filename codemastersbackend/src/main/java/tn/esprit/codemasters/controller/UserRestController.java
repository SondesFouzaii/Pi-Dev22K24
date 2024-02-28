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

    @GetMapping("/getpassword")
    public String resetpwd(String email) {
        return userService.resetpwd(email);
    }


    @PostMapping("/add-comment")
    public Comment addSimpleUser(@RequestBody Comment comment,Long idu,Long idp) {
        return userService.addcomment(comment,idu,idp);
    }
}
