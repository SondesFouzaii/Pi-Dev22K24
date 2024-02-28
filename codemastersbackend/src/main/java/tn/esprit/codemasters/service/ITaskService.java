package tn.esprit.codemasters.service;

import tn.esprit.codemasters.entity.Task;

import java.util.List;

public interface ITaskService {
    public List<Task> retrieveAllTasks();
    public Task retrieveTask(Long TaskId);
    public Task addTask(Task t);
    public void removeTask(Long TaskId);
    public Task modifyTask(Task task);
    public List<Task> retrieveTasksByStatusAndUserStory(Task.TaskStat status,long userstory_id);

}
