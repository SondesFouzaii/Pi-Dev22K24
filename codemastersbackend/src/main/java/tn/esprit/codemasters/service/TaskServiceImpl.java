package tn.esprit.codemasters.service;

import tn.esprit.codemasters.entity.Task;
import tn.esprit.codemasters.repository.TaskRepository;

import java.util.List;

public class TaskServiceImpl implements ITaskService{
    TaskRepository taskRepository;
    @Override
    public List<Task> retrieveAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public Task retrieveTask(Long TaskId) {
        return taskRepository.findById(TaskId).orElse(null);
    }

    @Override
    public Task addTask(Task t) {
        return taskRepository.save(t);
    }

    @Override
    public void removeTask(Long TaskId) {
    taskRepository.deleteById(TaskId);
    }

    @Override
    public Task modifyTask(Task task) {
        return taskRepository.save(task);
    }
}
