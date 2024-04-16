package tn.esprit.codemasters.service;

import tn.esprit.codemasters.entity.Sprint;
import tn.esprit.codemasters.entity.Task;

import javax.xml.crypto.Data;
import java.util.Date;
import java.util.List;

public interface ISprintService {
    public List<Sprint> retrieveAllSprints();
    public Sprint retrieveSprint(Long SprintId);
    public Sprint addSprint(Sprint s);
    public void removeSprint(Long SprintId);
    public Sprint modifySprint(Sprint sprint);
    public List<Sprint> getSprintsbyTitle(String title);
    public List <Task> getTasksOfSprint(Long SprintId);
    public void affectTaskToSprint(Long sprintId,Long taskId);
    public void removeTaskFromSprint(Long sprintId,Long taskId);
    public boolean sprintExist(Date startDate, Date endDate);
}
