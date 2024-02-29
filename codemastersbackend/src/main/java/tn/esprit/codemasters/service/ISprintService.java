package tn.esprit.codemasters.service;

import tn.esprit.codemasters.entity.Sprint;

import java.util.List;

public interface ISprintService {
    public List<Sprint> retrieveAllSprints();
    public Sprint retrieveSprint(Long SprintId);
    public Sprint addSprint(Sprint s);
    public void removeSprint(Long SprintId);
    public Sprint modifySprint(Sprint sprint);
    public List<Sprint> getSprintsbyTitle(String title);
}
