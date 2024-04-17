package tn.esprit.codemasters.controller;


import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import tn.esprit.codemasters.entity.Project;
import tn.esprit.codemasters.entity.User;
import tn.esprit.codemasters.service.IProjetServ;

import java.util.List;
@Controller
@RestController
@AllArgsConstructor
@RequestMapping("project")
@CrossOrigin("*")
public class ControllerProject {
    @Autowired
    IProjetServ projetServ;


    @GetMapping("/retrieve-all-project")
    public List<Project> getProject() {
        return projetServ.retrieveAllProjects();
    }

    @GetMapping("/retrieve-project/{project-id}")
    public Project getProject(@PathVariable("project-id") Long id) {
        return projetServ.retrieveProject(id);
    }

    @PostMapping("/add-project")
    public Project addProject(@RequestBody Project project, @RequestParam("userId") Long userId) {
        return projetServ.addProject(project, userId);
    }


        @PutMapping("/modify-project/{project-id}")
    public Project modifyProject(@PathVariable("project-id") Long id, @RequestBody Project project) {
        project.setId(id);
        return projetServ.modifyProject(id,project);
    }


    @DeleteMapping("/remove-project/{projectId}")
    public ResponseEntity<String> removeProject(@PathVariable("projectId") Long id) {
        projetServ.removeProject(id);
        return ResponseEntity.ok("Project with ID " + id + " has been successfully removed.");
    }







}
