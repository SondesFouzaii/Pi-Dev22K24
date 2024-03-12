package tn.esprit.codemasters.service.houssem;

import tn.esprit.codemasters.entity.quiz.Quizimport;
import tn.esprit.codemasters.entity.quiz.Test;
import tn.esprit.codemasters.entity.UserTest;

import java.util.List;

public interface ITestService {
    public String addTest(Test test);
    public void activateanactivate(Long testId);
    public String modifyTest(Test test);
    public List<Test> retrieveAllTests();
    public Test retrieveTest(Long testId);
    public String addquestiontotest(Long idTest,Long idQustion);
    public void deletequestion(Long questionId);
    public void importquiz(Quizimport quiz);

//
//
//
//
//
    public void addusertest(UserTest userTest);
    public List<UserTest> showalltests();
}
