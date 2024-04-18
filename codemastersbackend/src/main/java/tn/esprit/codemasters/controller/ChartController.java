package tn.esprit.codemasters.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.codemasters.service.ChartService;

import java.util.List;
import java.util.stream.Collectors;
import tn.esprit.codemasters.repository.TeamRepository;
@RestController
public class ChartController {

    @Autowired
    private ChartService chartService;
    @Autowired
    private TeamRepository teamRepository;

    @GetMapping("/chart/data")
    public String getChartData() {
        return chartService.getChartData();
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