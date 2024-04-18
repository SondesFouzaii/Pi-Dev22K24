package tn.esprit.codemasters.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;
import tn.esprit.codemasters.entity.Project;
import tn.esprit.codemasters.entity.Team;
import tn.esprit.codemasters.entity.user.User;
import tn.esprit.codemasters.repository.ProjectRepository;
import tn.esprit.codemasters.repository.TeamRepository;
import tn.esprit.codemasters.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.*;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service

@AllArgsConstructor
public class TeamServiceImp implements ITeamService{
    TeamRepository teamRepository;
    UserRepository userRepository;
    ProjectRepository projectRepository;
    @Autowired
    private  EmailService emailService;
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

        team.getProjects().forEach(project -> {
            project.setTeam(null);
        });
        team.getUsers().forEach(user -> {
            user.getTeams().remove(team);
        });

        projectRepository.saveAll(team.getProjects());
        userRepository.saveAll(team.getUsers());

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
    @Transactional
    @Override
    public void addTeam(String teamName, Set<String> userEmails, Set<String> projectNames) {
        // Créer une nouvelle équipe
        Team team = new Team();
        team.setName(teamName);
        String to="springmay1@outlook.com";
        String subject="TEAM  added";
        String body="Team  added succesfully";
        emailService.sendSimpleMessage(to,subject,body);
        // Associer les utilisateurs à l'équipe par email
        Set<User> users = new HashSet<>();
        for (String email : userEmails) {
            Optional<User> userOptional = userRepository.findByEmail(email);
            if (userOptional.isPresent()) {
                users.add(userOptional.get());
            } else {
                throw new IllegalArgumentException("User not found with email: " + email);
            }
        }
        team.setUsers(users);

        // Associer les projets à l'équipe par nom
        Set<Project> projects = new HashSet<>();
        for (String projectName : projectNames) {
            Optional<Project> projectOptional = projectRepository.findByName(projectName);
            if (projectOptional.isPresent()) {
                Project project = projectOptional.get();
                projects.add(project);
                project.setTeam(team);  // Affecter l'équipe au projet
            } else {
                throw new IllegalArgumentException("Project not found with name: " + projectName);
            }
        }
        team.setProjects(projects);

        // Enregistrer l'équipe et mettre à jour les associations dans la base de données
        teamRepository.save(team);

        // Mettre à jour les associations utilisateur-équipe dans la base de données
        for (User user : users) {
            user.getTeams().add(team);
            userRepository.save(user);
        }
    }


    @Transactional  // Ensure this operation is transactional
    @Override
    public void addUsersToTeam(Long teamId, Set<String> userEmails) {

        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new IllegalArgumentException("Team not found with ID : " + teamId));

        userEmails.stream()
                .map(email -> userRepository.findByEmail(email)
                        .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email)))
                .forEach(user -> {
                    team.getUsers().add(user);
                    user.getTeams().add(team);
                });

        teamRepository.save(team);

    }


    @Override
    public void addProjectsToTeam(Long teamId, Set<String> projectNames) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new IllegalArgumentException("Team not found with ID : " + teamId));

        for (String projectName : projectNames) {
            Project project = projectRepository.findByName(projectName)
                    .orElseThrow(() -> new IllegalArgumentException("Project not found with name: " + projectName));

            // Check if the project is already assigned to another team
            if (project.getTeam() != null && !project.getTeam().equals(team)) {
                throw new IllegalStateException("Project is already assigned to another team");
            }

            team.getProjects().add(project);
            project.setTeam(team);
        }

        teamRepository.save(team);
    }

    @Override
    public List<Team> searchTeams(String query) {
        return teamRepository.searchTeams(query);
    }


    public Page<Team> getTeamsForCalendar(Pageable pageable) {
        return teamRepository.findAll(pageable);
    }


}
