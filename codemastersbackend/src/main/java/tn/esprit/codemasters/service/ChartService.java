package tn.esprit.codemasters.service;

import org.springframework.stereotype.Service;

@Service
public class ChartService {

    public String getChartData() {
        return "{"
                + "type: 'bar',"
                + "data: {"
                + "  labels: ['Red', 'Blue'],"
                + "  datasets: [{"
                + "    label: 'Demo',"
                + "    data: [12, 19]"
                + "  }]"
                + "}"
                + "}";
    }
}