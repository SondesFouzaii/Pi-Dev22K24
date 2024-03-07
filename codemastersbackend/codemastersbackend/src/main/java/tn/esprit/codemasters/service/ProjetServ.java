package tn.esprit.codemasters.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.codemasters.entity.Project;
import tn.esprit.codemasters.entity.User;
import tn.esprit.codemasters.repository.ProjectRepository;
import tn.esprit.codemasters.repository.UserRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
@Service
@AllArgsConstructor
public class ProjetServ implements IProjetServ {
    UserRepository userRepository;
    ProjectRepository projectRepository;

    @Override
    public List<Project> retrieveAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public Project retrieveProject(Long projectId) {
        return projectRepository.findById(projectId).orElse(null);
    }

    @Transactional
    @Override
    public Project addProject(Project project, Long userId) {
        User productOwner = userRepository.findById(userId).orElse(null);
        if (productOwner != null) {
            if (productOwner.getProjectpo() == null) {
                productOwner.setProjectpo(new HashSet<>());
            }
            productOwner.getProjectpo().add(project);
        }
        return projectRepository.save(project);
    }
   /** @Override
    @Transactional
    public void removeProject(Long projectId) {
        Optional<Project> projectOptional = projectRepository.findById(projectId);
        projectOptional.ifPresent(project -> {
            // Supprimer les références de projet associées aux utilisateurs
            project.getUsers().forEach(user -> {
                user.getProjectdevolpppers().remove(project);
                user.getProjectpo().remove(project);
                user.getProjectscrummaster().remove(project);
            });

            // Supprimer les références de projet associées aux histoires utilisateur
            project.getUserStoryset().forEach(userStory -> userStory.setProject(null));

            // Supprimer le projet
            projectRepository.deleteById(projectId);
        });
    }**/
   @Transactional
   public void removeProject(Long projectId) {
       Optional<Project> projectOptional = projectRepository.findById(projectId);
       projectOptional.ifPresent(project -> {
           // Supprimer les références de projet associées aux utilisateurs
           Set<User> users = project.getUsers();
           for (User user : users) {
               user.getProjectdevolpppers().remove(project);
               user.getProjectpo().remove(project);
           }

           // Supprimer le projet
           projectRepository.delete(project);
       });
   }


    @Override
    public Project modifyProject(Long projectId, Project project) {
        return projectRepository.save(project);
    }
}
