package tn.esprit.codemasters.service;

import tn.esprit.codemasters.entity.Team;

import java.util.List;
import java.util.Set;

public interface ITeamService {
    public List<Team> retrieveAllTeam();
    public Team retrieveTeam(Long teamId);
    public void deleteTeam(long teamId);


    public String updateTeam(Long teamId, Team updatedTeam);
    public void addTeam(String teamName, Set<Long> userIds, Set<Long> projectIds);
    public void addUsersToTeam(Long teamId, Set<Long> userIds);
    public void addProjectsToTeam(Long teamId, Set<Long> projectIds);
    public List<Team> searchTeams(String query);
}
