package tn.esprit.codemasters.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.codemasters.entity.Team;
import tn.esprit.codemasters.repository.ProjectRepository;
import tn.esprit.codemasters.repository.TeamRepository;
import tn.esprit.codemasters.repository.UserRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardService {
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProjectRepository projectRepository;

    public long getTotalTeams() {
        return teamRepository.countTeams();
    }

    public long getTotalUsersInTeams() {
        return userRepository.countUsersInTeams();
    }

    public long getTotalProjectsInTeams() {
        return projectRepository.countProjectsInTeams();
    }
    public List<Map<String, Object>> getTeamsWithGenderCounts() {
        List<Object[]> results = teamRepository.getGenderCountsByTeam();
        return results.stream().map(this::convertToMap).collect(Collectors.toList());
    }

    private Map<String, Object> convertToMap(Object[] objects) {
        Map<String, Object> result = new HashMap<>();
        result.put("teamName",objects[ 0]);
        result.put("maleCount", objects[1]);
        result.put("femaleCount", objects[2]);
        return result;
    }


    public Map<String, Long> getRoleCounts() {
        Map<String, Long> roleCounts = new HashMap<>();
        Long[] counts = userRepository.getTotalRoleCounts();

        if (counts != null && counts.length >= 3) {
            roleCounts.put("developers", getCountFromResult(counts, 0));
            roleCounts.put("productOwners", getCountFromResult(counts, 1));
            roleCounts.put("scrumMasters", getCountFromResult(counts, 2));
        } else {
            System.out.println("Unexpected counts array or insufficient length");
        }

        return roleCounts;
    }

    private Long getCountFromResult(Object[] results, int index) {
        if (results != null && index >= 0 && index < results.length && results[index] instanceof Number) {
            return ((Number) results[index]).longValue();
        } else {
            System.out.println("Unexpected data type or invalid index at index " + index);
            return 0L;  // Default to 0 if any condition fails
        }
    }









}
