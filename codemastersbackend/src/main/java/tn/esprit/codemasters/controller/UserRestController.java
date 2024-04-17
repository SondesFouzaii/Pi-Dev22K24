package tn.esprit.codemasters.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.codemasters.entity.User;
import tn.esprit.codemasters.service.IUserService;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("user")
public class UserRestController {
    @Autowired
    IUserService userService;

    @GetMapping("/retrieve-all-users")
    public List<User> getUsers() {
        return userService.retrieveAllUsers();
    }

    @GetMapping("/retrieve-user/{user-id}")
    public User getUser(@PathVariable("user-id") Long id) {
        return userService.retrieveUser(id);
    }

    @PostMapping("/add-user")
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @PutMapping("/modify-user")
    public User modifyUser(@RequestBody User user) {
        return userService.modifyUser(user);
    }

    @PutMapping("/modify-role/{UserId}/{role}")
    public User modifyRole(@PathVariable("UserId") Long UserId,@PathVariable("role") User.Role role) {
        return userService.modifyRole(UserId, role);
    }

    @PutMapping("/bloquer-debloquer/{UserId}")
    public void bloquerdebloquer(@PathVariable("UserId") Long UserId) {
        userService.bloquerdebloquer(UserId);
    }
    
    @DeleteMapping("/remove-user/{user-id}")
    public void removeUser(@PathVariable("user-id") Long id) {
        userService.removeUser(id);
    }
    
    @GetMapping("/genders")
    public List<User.Gender> getGenders() {
        return Arrays.asList(User.Gender.values());
    }

    @GetMapping("/roles")
    public List<User.Role> getRoles() {
        return Arrays.asList(User.Role.values());
    }
}
