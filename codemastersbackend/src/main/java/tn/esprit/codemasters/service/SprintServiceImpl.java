package tn.esprit.codemasters.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.codemasters.entity.Sprint;
import tn.esprit.codemasters.entity.Task;
import tn.esprit.codemasters.repository.SprintRepository;
import tn.esprit.codemasters.repository.TaskRepository;

import java.util.ArrayList;
import java.util.List;
@Service
@AllArgsConstructor
public class SprintServiceImpl implements ISprintService{
    SprintRepository sprintRepository;
    TaskRepository taskRepository;
    @Override
    public List<Sprint> retrieveAllSprints() {
        return sprintRepository.findAll();
    }

    @Override
    public Sprint retrieveSprint(Long SprintId) {
        return sprintRepository.findById(SprintId).orElse(null);
    }

    @Override
    public Sprint addSprint(Sprint s) {
        return sprintRepository.save(s);
    }

    @Override
    public void removeSprint(Long SprintId) {
        sprintRepository.deleteById(SprintId);

    }

    @Override
    public Sprint modifySprint(Sprint sprint) {
        return sprintRepository.save(sprint);
    }

    @Override
    public List<Sprint> getSprintsbyTitle(String title) {
        return sprintRepository.findByTitle(title);
    }

    @Override
    public List<Task> getTasksOfSprint(Long sprintId) {
        Sprint sprint = sprintRepository.findById(sprintId).orElse(null);
        List<Task> sprintTasks = new ArrayList<>();
        if (sprint != null) {
            sprintTasks.addAll(sprint.getTasks());
        }
        return sprintTasks;
    }

    @Override
    public void affectTaskToSprint(Long sprintId,Long taskId) {
        Task task= taskRepository.findById(taskId).orElse(null);
        Sprint sprint=sprintRepository.findById(sprintId).orElse(null);
        if (sprint!=null)
        {
            sprint.getTasks().add(task);
            task.setSprint(sprint);
            taskRepository.save(task);
            sprintRepository.save(sprint);

        }


    }

    @Override
    public void removeTaskFromSprint(Long sprintId, Long taskId) {
        Task task= taskRepository.findById(taskId).orElse(null);
        Sprint sprint=sprintRepository.findById(sprintId).orElse(null);
        if (sprint!=null)
        {
            sprint.getTasks().remove(task);
            task.setSprint(null);
            taskRepository.save(task);
            sprintRepository.save(sprint);

        }
    }
}
