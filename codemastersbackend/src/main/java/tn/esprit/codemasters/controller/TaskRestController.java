package tn.esprit.codemasters.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.codemasters.entity.Task;
import tn.esprit.codemasters.entity.User;
import tn.esprit.codemasters.service.ITaskService;

import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskRestController {
    @Autowired
    ITaskService taskService;

    @GetMapping("/retrieve-all-tasks")
    public List<Task> getTasks() {
        return taskService.retrieveAllTasks();
    }


    @GetMapping("/retrieve-task/{task-id}")
    public Task getTask(@PathVariable("task-id") Long id) {
        return taskService.retrieveTask(id);
    }

    @PostMapping("/add-task")
    public Task addTask(@RequestBody Task task) {
        return taskService.addTask(task);
    }


    @PutMapping("/modify-task")
    public Task modifyTask(@RequestBody Task task) {
        return taskService.modifyTask(task);
    }


    @DeleteMapping("/remove-task/{task-id}")
    public void removeTask(@PathVariable("task-id") Long id) {
        taskService.removeTask(id);
    }

    @GetMapping("/retrieve-tasks-by-status")
    public List<Task> getTasksByStatus(@RequestParam Task.TaskStat status) {
        return taskService.retrieveTasksByStatus(status);
    }
}
