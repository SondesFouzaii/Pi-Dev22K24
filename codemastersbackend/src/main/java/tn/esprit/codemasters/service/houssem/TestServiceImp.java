package tn.esprit.codemasters.service.houssem;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.codemasters.entity.*;
import tn.esprit.codemasters.repository.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class TestServiceImp implements ITestService{
TestRepository testRepository;
QuestionRepository questionRepository;
QuestionOptionRepository questionOptionRepository;

UserRepository userRepository;
UserTestRepository userTestRepository;
    /**
     * @param test
     * @return
     */
    @Override
    public String addTest(Test test) {
        Set<Question> questions=new HashSet<>();
        for (Question q:test.getQuestions()) {
            questions.add(q);
            Set<QuestionOption> options=new HashSet<>();
            for (QuestionOption o:q.getQuestionOptions())
                options.add(o);
            q.setQuestionOptions(options);
        }
        test.setActive(true);
        test.setQuestions(questions);
        testRepository.save(test);

        return "test added succesfuly";
    }

    /**
     * @param testId
     */
    @Override
    public void activateanactivate(Long testId) {
        Test test=testRepository.findById(testId).orElse(null);
        if (!test.isActive())
            test.setActive(true);
        else
            test.setActive(false);
        testRepository.save(test);
    }

    /**
     * @param test
     * @return
     */
    @Override
    public String modifyTest(Test test) {
        Test oldtest=testRepository.findById(test.getId()).orElse(null);
        oldtest.setTitle(test.getTitle());
        oldtest.setDescription(test.getDescription());
        oldtest.setImage(test.getImage());
        testRepository.save(oldtest);
        return "test updated succesfuly";
    }

    /**
     * @return
     */
    @Override
    public List<Test> retrieveAllTests() {
        return testRepository.findAll();
    }

    /**
     * @param testId
     * @return
     */
    @Override
    public Test retrieveTest(Long testId) {
        return testRepository.findById(testId).orElse(null);
    }

    /**
     * @param idTest
     * @param idQustion
     * @return
     */
    @Override
    public String addquestiontotest(Long idTest, Long idQustion) {
        return null;
    }

    /**
     * @param questionId
     */
    @Override
    public void deletequestion(Long questionId) {

    }

    @Override
    public void addusertest(UserTest userTest) {
        User user=userTest.getUser();
        Test test=userTest.getTest();
        userTest.setUser(user);
        userTest.setTest(test);
        userTestRepository.save(userTest);
    }

    @Override
    public List<UserTest> showalltests() {
        return userTestRepository.findAll();
    }
}
