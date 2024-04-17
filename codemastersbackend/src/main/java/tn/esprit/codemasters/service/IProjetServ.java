package tn.esprit.codemasters.service;

import tn.esprit.codemasters.entity.Project;

import java.util.List;

public interface IProjetServ {
    public List<Project> retrieveAllProjects();
    public Project retrieveProject(Long ProjectId);
    public Project addProject(Project c, Long Po);
    public void removeProject(Long ProjectId);
    public Project modifyProject(Long ProjectId,Project Project);
}
