package tn.esprit.codemasters.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;
import tn.esprit.codemasters.entity.Project;
import tn.esprit.codemasters.entity.Team;
import tn.esprit.codemasters.entity.User;
import tn.esprit.codemasters.repository.ProjectRepository;
import tn.esprit.codemasters.repository.TeamRepository;
import tn.esprit.codemasters.repository.UserRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service

@AllArgsConstructor
public class TeamServiceImp implements ITeamService{
    TeamRepository teamRepository;
    UserRepository userRepository;
    ProjectRepository projectRepository;
    @Override
    public List<Team> retrieveAllTeam() {

        return teamRepository.findAll();
    }



    @Override
    public Team retrieveTeam(Long teamId) {
        return teamRepository.findById(teamId).orElse(null);
    }

    @Override
    public void deleteTeam(long teamId) {
        Team team = teamRepository.findById(teamId).orElseThrow(() -> new NotFoundException("Team not found"));

        // Clear associated projects and users to avoid foreign key constraint violations
        team.getProjects().forEach(project -> {
            project.setTeam(null); // Disassociate the team from projects
        });
        team.getUsers().forEach(user -> {
            user.getTeams().remove(team); // Remove the team from users' teams collection
        });

        // Save the changes to projects and users
        projectRepository.saveAll(team.getProjects());
        userRepository.saveAll(team.getUsers());

        // Now, it's safe to delete the team
        teamRepository.delete(team);
    }







    @Override
    public String updateTeam(Long teamId, Team updatedTeam) {
        Team existingTeam = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));

        existingTeam.setName(updatedTeam.getName());
        teamRepository.save(existingTeam); // Sauvegarde les modifications dans la base de données
        return "Team updated successfully";
    }

    @Override
    public void addTeam(String teamName, Set<Long> userIds, Set<Long> projectIds) {
        // Créer une nouvelle équipe
        Team team = new Team();
        team.setName(teamName);

        // Associer les utilisateurs à l'équipe
        Set<User> users = new HashSet<>();
        for (Long userId : userIds) {
            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                users.add(user);

            } else {
                throw new IllegalArgumentException("User not found with ID : " + userId);
            }
        }
        team.setUsers(users);

        // Associer les projets à l'équipe
        Set<Project> projects = new HashSet<>();
        for (Long projectId : projectIds) {
            Optional<Project> projectOptional = projectRepository.findById(projectId);
            if (projectOptional.isPresent()) {
                Project project = projectOptional.get();
                projects.add(project);
                project.setTeam(team);  // Affecter l'équipe au projet
            } else {
                throw new IllegalArgumentException("Project not found with ID: " + projectId);
            }
        }
        team.setProjects(projects);

        // Enregistrer l'équipe et mettre à jour les associations dans la base de données
        teamRepository.save(team);

        // Créer une copie de la collection users
        Set<User> usersCopy = new HashSet<>(users);

        // Mettre à jour les associations dans la table de jointure user_teams
        for (User user : usersCopy) {
            user.getTeams().add(team);
            userRepository.save(user);
        }

    }

    @Override
    public void addUsersToTeam(Long teamId, Set<Long> userIds) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new IllegalArgumentException("Team not found with ID : " + teamId));

        for (Long userId : userIds) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found with ID : " + userId));

            team.getUsers().add(user);
            user.getTeams().add(team);
        }

        teamRepository.save(team);

    }

    @Override
    public void addProjectsToTeam(Long teamId, Set<Long> projectIds) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new IllegalArgumentException("Team not found with ID : " + teamId));

        for (Long projectId : projectIds) {
            Project project = projectRepository.findById(projectId)
                    .orElseThrow(() -> new IllegalArgumentException("Project not found with ID: " + projectId));

            team.getProjects().add(project);
            project.setTeam(team);
        }

        teamRepository.save(team);
    }

    @Override
    public List<Team> searchTeams(String query) {
        return teamRepository.searchTeams(query);
    }


}
