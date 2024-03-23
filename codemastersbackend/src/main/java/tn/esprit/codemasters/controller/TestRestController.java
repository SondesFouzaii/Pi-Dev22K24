package tn.esprit.codemasters.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.codemasters.entity.quiz.ApiOpenquizzdb;
import tn.esprit.codemasters.entity.quiz.Quizimport;
import tn.esprit.codemasters.entity.quiz.Test;
import tn.esprit.codemasters.entity.UserTest;
import tn.esprit.codemasters.service.houssem.ITestService;

import java.util.List;

@RestController
@RequestMapping("quiz")
public class TestRestController {
    @Autowired
    ITestService testService;
    @PostMapping("/add-test")
    public String addTest(@RequestBody Test test) {
        return testService.addTest(test);
    }

    @PostMapping("/add-quiz/{img}")
    public void importquiz(@RequestBody Quizimport quiz,@PathVariable("img") String img) {
        //https://openquizzdb.org/media/cover/oqdb_quizz_204.jpg
        String image="https://openquizzdb.org/media/cover/oqdb_quizz_"+img+".jpg";
         testService.importquiz(quiz,image);
    }

    @GetMapping("/retrieve-all-tests")
    public List<Test> retrieveAllTests() {
        return testService.retrieveAllTests();
    }

    @GetMapping("/retrieve-test/{id}")
    public Test retrieveTest(@PathVariable ("id") Long id) {
        return testService.retrieveTest(id);
    }



    @PostMapping("/pass-test")
    public void addusertest(@RequestBody UserTest userTest){
        testService.addusertest(userTest);
    }

    @GetMapping("/retrieve-all-passed")
    public List<UserTest> showalltests(){return testService.showalltests();}

    @PutMapping("/activateanactivate/{testId}")
    public void activateanactivate(@PathVariable("testId") Long testId) {
        testService.activateanactivate(testId);
    }

        @PostMapping("/add-quiz-api")
    public void addtestwithapi(@RequestBody List<ApiOpenquizzdb> apiOpenquizzdbs) {
        testService.addtestwithapi(apiOpenquizzdbs);
    }

}
