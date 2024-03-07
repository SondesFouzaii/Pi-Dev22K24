package tn.esprit.codemasters.controller;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import tn.esprit.codemasters.entity.Project;
import tn.esprit.codemasters.entity.UserStory;
import tn.esprit.codemasters.service.UserStoryServ;

import java.util.List;

@RestController
@RequestMapping("userStory")
@Controller
@NoArgsConstructor
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class UserStoryController {
    @Autowired
    UserStoryServ userStoryServ;

    @GetMapping("/retrieve-all-userstory")
    public List<UserStory> getUserStory() {
        return userStoryServ.retrieveAllUsersStory();
    }

    @GetMapping("/retrieve-UserStory/{UserStory-id}")
    public UserStory getUserStory(@PathVariable("UserStory-id") Long id) {
        return userStoryServ.retrieveUserStory(id);
    }

    @PostMapping("/add-user-story-to-project/{projectId}/{userId}")
    public ResponseEntity<UserStory> addUserStoryToProject(@RequestBody UserStory userStory,
                                                           @PathVariable("projectId") Long projectId,
                                                           @PathVariable("userId") Long userId) {
        UserStory addedUserStory = userStoryServ.addUserStoryToProject(userStory, projectId, userId);

        if (addedUserStory != null) {
            return new ResponseEntity<>(addedUserStory, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PutMapping("/updateUserstory/{UserStory-id}")
    public UserStory modifyUserStory(@RequestBody UserStory userStory , @PathVariable("UserStory-id") Long id) {
        userStory.setId(id);
        return userStoryServ.modifyUserStoryId(userStory,id);
    }


    @DeleteMapping("/remove-userstory/{userStoryId}")
    public ResponseEntity<?> removeUserStory(@PathVariable("userStoryId") Long userStoryId) {
        try {
            userStoryServ.removeUserStory(userStoryId);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }




}
