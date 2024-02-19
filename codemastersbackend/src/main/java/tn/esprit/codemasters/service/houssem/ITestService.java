package tn.esprit.codemasters.service.houssem;

import tn.esprit.codemasters.entity.Test;
import tn.esprit.codemasters.entity.Test;

import java.util.List;

public interface ITestService {
    public List<Test> retrieveAllTests(); 
    public Test retrieveTest(Long TestId);
    public Test addTest(Test c);
    public void activedesactiver(Long TestId);
    public Test modifyTest(Test test);

}
