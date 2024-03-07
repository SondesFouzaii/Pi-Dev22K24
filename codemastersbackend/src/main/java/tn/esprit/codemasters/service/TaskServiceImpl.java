package tn.esprit.codemasters.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.codemasters.entity.Task;
import tn.esprit.codemasters.entity.UserStory;
import tn.esprit.codemasters.repository.TaskRepository;
import tn.esprit.codemasters.repository.UserStoryRepository;

import java.util.List;
@Service
@AllArgsConstructor
public class TaskServiceImpl implements ITaskService{
    TaskRepository taskRepository;
    UserStoryRepository userStoryRepository;
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

    //@Override
    ///public Task addTask(Task task) {
    ////    UserStory userStory = userStoryRepository.findById(task.getUserstory().getId()).orElse(null);
      //  if (userStory != null) {
      //      userStory.getTasks().add(task);
     //       userStoryRepository.save(userStory); // Enregistrer les modifications apportées à UserStory
     //   }
     //   return taskRepository.save(task);
 //   }

    @Override
    public Task modifyTask(Task task) {


        return taskRepository.save(task);





        /*// Récupérer l'ancienne UserStory associée à la tâche
        UserStory oldUserStory = taskRepository.findById(task.getId()).map(Task::getUserstory).orElse(null);

        UserStory newUserStory = userStoryRepository.findById(task.getUserstory().getId()).orElse(null);
        if (newUserStory != null) {
            newUserStory.getTasks().add(task);
            userStoryRepository.save(newUserStory); // Enregistrer les modifications apportées à la nouvelle UserStory
        }

        // Si la UserStory associée à la tâche a changé
        if (oldUserStory != null && newUserStory != null && oldUserStory.getId() != newUserStory.getId()) {
            oldUserStory.getTasks().remove(task); // Supprimer la tâche de l'ancienne UserStory
            userStoryRepository.save(oldUserStory); // Enregistrer les modifications apportées à l'ancienne UserStory
        }*/
    }


    //@Override
 //   public List<Task> retrieveTasksByStatusAndUserStory(Task.TaskStat status,long userstory_id) {
 //       return taskRepository.findByStatusAndUserstoryId(status,userstory_id);
   // }
}
