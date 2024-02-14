package tn.esprit.codemasters.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.codemasters.entity.Sprint;
import tn.esprit.codemasters.service.ISprintService;

import java.util.List;

@RestController
@RequestMapping("/sprint")
public class SprintController {

    @Autowired
    ISprintService sprintService;

    @GetMapping("/retrieve-all-sprints")
    public List<Sprint> getSprints() {
        return sprintService.retrieveAllSprints();
    }


    @GetMapping("/retrieve-sprint/{sprint-id}")
    public Sprint getSprint(@PathVariable("sprint-id") Long id) {
        return sprintService.retrieveSprint(id);
    }

    @PostMapping("/add-sprint")
    public Sprint addSprint(@RequestBody Sprint sprint) {
        return sprintService.addSprint(sprint);
    }


    @PutMapping("/modify-sprint")
    public Sprint modifySprint(@RequestBody Sprint sprint) {
        return sprintService.modifySprint(sprint);
    }


    @DeleteMapping("/remove-sprint/{sprint-id}")
    public void removeSprint(@PathVariable("sprint-id") Long id) {
        sprintService.removeSprint(id);
    }
}
