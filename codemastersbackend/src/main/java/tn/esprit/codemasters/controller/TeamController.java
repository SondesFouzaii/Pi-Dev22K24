package tn.esprit.codemasters.controller;


import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import tn.esprit.codemasters.entity.Team;
import tn.esprit.codemasters.repository.TeamRepository;
import tn.esprit.codemasters.service.ITeamService;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RequestMapping("teams")
@RestController
public class TeamController {
    @Autowired
    ITeamService teamService;
    @Autowired
    TeamRepository teamRepository;
    @GetMapping("/retrieveAllTeam")
    public List<Team> retrieveAllTeam(){
        return teamService.retrieveAllTeam();
    }

    @GetMapping("/retrieveTeam/{teamId}")
    public Team retrieveTeam(@PathVariable("teamId") Long teamId) {
        return teamService.retrieveTeam(teamId);
    }

    @DeleteMapping("/deleteTeam/{teamId}")
    public void deleteTeam(@PathVariable("teamId") Long teamId) {
        teamService.deleteTeam(teamId);
    }


    @PutMapping("/updateTeam/{teamId}")
    public ResponseEntity<String> updateTeam(@PathVariable Long teamId, @RequestBody Team updatedTeam) {
        String message = teamService.updateTeam(teamId, updatedTeam);
        return ResponseEntity.ok(message);
    }

    @PostMapping("/addTeam")
    public ResponseEntity<String> addTeam(@RequestBody TeamRequest teamRequest) {
        try {
            teamService.addTeam(teamRequest.getTeamName(), teamRequest.getUserEmails(), teamRequest.getProjectNames());
            return ResponseEntity.ok("Team created successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An error occurred: " + e.getMessage());
        }
    }

    @PostMapping("/addUsersToTeam/{teamId}")
    public ResponseEntity<String> addUsersToTeamByEmail(@PathVariable Long teamId, @RequestBody Set<String> userEmails) {
        try {
            teamService.addUsersToTeam(teamId, userEmails);
            return ResponseEntity.ok("Users added successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PostMapping("/addProjectsToTeam/{teamId}")
    public ResponseEntity<String> addProjectsToTeamByName(@PathVariable Long teamId, @RequestBody Set<String> projectNames) {
        try {
            teamService.addProjectsToTeam(teamId, projectNames);
            return ResponseEntity.ok("Projects added successfully");
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/searchTeams")
    public ResponseEntity<List<Team>> searchTeams(@RequestParam String query) {
        List<Team> searchResults = teamService.searchTeams(query);
        return ResponseEntity.ok(searchResults);
    }
    @GetMapping("/teams")
    public Page<Team> getTeams(Pageable pageable) {
        return teamRepository.findAll(pageable);
    }

    @GetMapping("/calendar")
    public ResponseEntity<Page<Team>> getTeamsForCalendar(Pageable pageable) {
        Page<Team> calendarTeams = teamService.getTeamsForCalendar(pageable);
        return ResponseEntity.ok(calendarTeams);
    }
    @GetMapping("/chart-data")
    public List<Object> getTeamChartData() {
        List<Object[]> rawData = teamRepository.findTeamStats();
        return rawData.stream().map(data -> {
            String teamName = (String) data[0];
            long userCount = (Long) data[1];
            long projectCount = (Long) data[2];
            return new Object() {
                public String name = teamName;
                public long users = userCount;
                public long projects = projectCount;
            };
        }).collect(Collectors.toList());
    }
}
@Setter
@Getter
 class TeamRequest {
    private String teamName;
    private Set<String> userEmails;
    private Set<String> projectNames; // Getters et setters
}
