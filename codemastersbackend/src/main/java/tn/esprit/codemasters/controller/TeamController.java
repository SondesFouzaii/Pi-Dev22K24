package tn.esprit.codemasters.controller;


import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import tn.esprit.codemasters.entity.Team;
import tn.esprit.codemasters.service.ITeamService;


import java.util.List;
import java.util.Set;

@RequestMapping("teams")
@RestController
public class TeamController {
    @Autowired
    ITeamService teamService;
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
    public void addTeam(@RequestBody TeamRequestDTO teamRequestDTO) {
        teamService.addTeam(teamRequestDTO.getTeamName(), teamRequestDTO.getUserIds(), teamRequestDTO.getProjectIds());
    }

    @PostMapping("/addUsersToTeam/{teamId}")
    public ResponseEntity<String> addUsersToTeam(@PathVariable Long teamId, @RequestBody Set<Long> userIds) {
        try {
            teamService.addUsersToTeam(teamId, userIds);
            return ResponseEntity.ok("User added succesfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/addProjectsToTeam/{teamId}")
    public ResponseEntity<String> addProjectsToTeam(@PathVariable Long teamId, @RequestBody Set<Long> projectIds) {
        try {
            teamService.addProjectsToTeam(teamId, projectIds);
            return ResponseEntity.ok("Project added succesfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/searchTeams")
    public ResponseEntity<List<Team>> searchTeams(@RequestParam String query) {
        List<Team> searchResults = teamService.searchTeams(query);
        return ResponseEntity.ok(searchResults);
    }


}
@Setter
@Getter
class TeamRequestDTO {
    private String teamName;
    private Set<Long> userIds;
    private Set<Long> projectIds;

    // Getters et setters
}