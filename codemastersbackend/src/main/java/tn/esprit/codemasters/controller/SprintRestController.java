package tn.esprit.codemasters.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.codemasters.entity.Sprint;
import tn.esprit.codemasters.entity.Task;
import tn.esprit.codemasters.service.ISprintService;

import java.util.List;

@RestController
@RequestMapping("/sprint")
public class SprintRestController {

    @Autowired
    ISprintService sprintService;

    @GetMapping("/get-all-sprints")
    public List<Sprint> getSprints() {
        return sprintService.retrieveAllSprints();
    }


    @GetMapping("/get-sprint/{sprint-id}")
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


    @DeleteMapping("/delete-sprint/{sprint-id}")
    public void removeSprint(@PathVariable("sprint-id") Long id) {
        sprintService.removeSprint(id);
    }

    @GetMapping("/get-sprints-by-title/{sprint-title}")
    public List <Sprint> getSprintByTitle(@PathVariable("sprint-title") String title) {
        return sprintService.getSprintsbyTitle(title);
    }

    @GetMapping("/get-tasks-of-sprint/{sprint-id}")
    public List <Task> getTasksOfSprint(@PathVariable("sprint-id") Long sprintId) {
        return sprintService.getTasksOfSprint(sprintId);
    }

    @PutMapping("/affect-task-to-sprint/{sprint-id}/{task-id}")
    public void affectTaskToSprint(@PathVariable("sprint-id") Long sprintId,@PathVariable("task-id") Long taskId) {
        sprintService.affectTaskToSprint(sprintId, taskId);
    }
}
