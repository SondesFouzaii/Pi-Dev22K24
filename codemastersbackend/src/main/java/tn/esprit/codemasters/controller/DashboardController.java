package tn.esprit.codemasters.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.codemasters.entity.Team;
import tn.esprit.codemasters.service.DashboardService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {
    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/totalTeams")
    public ResponseEntity<Long> getTotalTeams() {
        return ResponseEntity.ok(dashboardService.getTotalTeams());
    }

    @GetMapping("/totalUsersInTeams")
    public ResponseEntity<Long> getTotalUsersInTeams() {
        return ResponseEntity.ok(dashboardService.getTotalUsersInTeams());
    }

    @GetMapping("/totalProjectsInTeams")
    public ResponseEntity<Long> getTotalProjectsInTeams() {
        return ResponseEntity.ok(dashboardService.getTotalProjectsInTeams());
    }
    @GetMapping("/genderstats")
    public ResponseEntity<List<Map<String, Object>>> getGenderStats() {
        List<Map<String, Object>> genderStats = dashboardService.getTeamsWithGenderCounts();
        return ResponseEntity.ok(genderStats);
    }
    @GetMapping("/role_counts")
    public ResponseEntity<Map<String, Long>> getRoleCounts() {
        Map<String, Long> roleCounts = dashboardService.getRoleCounts();
        return ResponseEntity.ok(roleCounts);
    }


}
