package tn.esprit.codemasters.service.houssem;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.codemasters.entity.Question;
import tn.esprit.codemasters.entity.QuestionOption;
import tn.esprit.codemasters.entity.Test;
import tn.esprit.codemasters.entity.User;
import tn.esprit.codemasters.repository.QuestionOptionRepository;
import tn.esprit.codemasters.repository.QuestionRepository;
import tn.esprit.codemasters.repository.TestRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class TestServiceImp implements ITestService{
TestRepository testRepository;
QuestionRepository questionRepository;
QuestionOptionRepository questionOptionRepository;

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
        return null;
    }

    /**
     * @param testId
     * @return
     */
    @Override
    public Test retrieveTest(Long testId) {
        return null;
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
}
