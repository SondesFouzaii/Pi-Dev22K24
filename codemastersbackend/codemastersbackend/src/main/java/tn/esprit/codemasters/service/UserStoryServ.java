package tn.esprit.codemasters.service;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.codemasters.entity.Project;
import tn.esprit.codemasters.entity.User;
import tn.esprit.codemasters.entity.UserStory;
import tn.esprit.codemasters.repository.ProjectRepository;
import tn.esprit.codemasters.repository.UserRepository;
import tn.esprit.codemasters.repository.UserStoryRepository;

import java.util.List;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class UserStoryServ implements IUserStoryInt {

    @Autowired
    private UserStoryRepository userStoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public List<UserStory> retrieveAllUsersStory() {
        return userStoryRepository.findAll();
    }

    @Override
    public UserStory retrieveUserStory(Long UserStrId) {
        return userStoryRepository.findById(UserStrId).orElse(null);
    }

    @Override
    public UserStory addUserStory(UserStory userStory) {
        // Implémentez la logique d'ajout d'une nouvelle UserStory
        return userStoryRepository.save(userStory);
    }

    public UserStory addUserStoryToProject(UserStory userStory, Long projectId, Long userId) {
        Project project = projectRepository.findById(projectId).orElse(null);
        User user = userRepository.findById(userId).orElse(null);

        if (project != null && user != null) {
            userStory.setProject(project);
            userStory.setUser(user);
            return userStoryRepository.save(userStory);
        } else {
            throw new IllegalArgumentException("Project or User not found");
        }
    }

    @Override
    public void removeUserStory(Long userStoryId) {
        if (userStoryRepository.existsById(userStoryId)) {
            UserStory userStory = userStoryRepository.findById(userStoryId).orElse(null);
            if (userStory != null) {
                User user = userStory.getUser();
                if (user != null) {
                    user.getUserStorys().remove(userStory);
                    userRepository.save(user);
                }

                Project project = userStory.getProject();
                if (project != null) {
                    project.getUserStoryset().remove(userStory);
                    projectRepository.save(project);
                }

                userStoryRepository.deleteById(userStoryId);
            }
        } else {
            throw new IllegalArgumentException("UserStory with id " + userStoryId + " does not exist");
        }
    }

    @Override
    public UserStory modifyUserStory(UserStory userStory) {
        return userStoryRepository.save(userStory);
    }

    public UserStory modifyUserStoryId(UserStory userStory, Long id) {
        userStory.setId(id);
        return userStoryRepository.save(userStory);
    }

}
