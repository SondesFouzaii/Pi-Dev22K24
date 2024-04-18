package tn.esprit.codemasters.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import tn.esprit.codemasters.entity.Team;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface ITeamService {
    public List<Team> retrieveAllTeam();
    public Team retrieveTeam(Long teamId);
    public void deleteTeam(long teamId);


    public String updateTeam(Long teamId, Team updatedTeam);
    public void addTeam(String teamName, Set<String> userEmails,Set<String> projectNames);
    public void addUsersToTeam(Long teamId, Set<String> userEmails);
    public void addProjectsToTeam(Long teamId, Set<String> projectNames);
    public List<Team> searchTeams(String query);
    public Page<Team> getTeamsForCalendar(Pageable pageable);

}
