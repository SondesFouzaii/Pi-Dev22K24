package tn.esprit.codemasters.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.codemasters.entity.quiz.*;
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

    @DeleteMapping("/delete/{testId}")
    public void deletetest(@PathVariable("testId") Long testId) {
        testService.deletetest(testId);
    }

    @PutMapping("/updatetest/{id}/{title}/{description}")
    public String modifyTest(@PathVariable("id") Long id,@PathVariable("title") String title,@PathVariable("description") String description){
        return testService.modifyTest(id,title,description);
    }

    @DeleteMapping("/deletequestion/{id}")
    public void deletequestion(@PathVariable("id") Long id) {
        testService.deletequestion(id);
    }

    @PostMapping("/add-question/{id}")
    public String addquestiontotest(@PathVariable("id") Long id, @RequestBody Question question){
        return testService.addquestiontotest(id,question);
    }

    @DeleteMapping("/deletehistory/{id}")
    public void deleteut(@PathVariable("id") Long id) {
        testService.deleteut(id);
    }


    //gemini
    @PostMapping("/add-gemini")
    public void addgemini(@RequestBody Gemini gemini){
        testService.addgemini(gemini);
    }

    @GetMapping("/retrieve-all-gemini/{id}")
    public List<Gemini> getallgemini(@PathVariable("id") Long id) {
        return testService.getallgemini(id);
    }





    // the comments of the test (not yet used)
    @GetMapping("/retrieve-all-TestComments")
    public List<TestComments> getComments() {
        return testService.getComments();
    }

    @PostMapping("/createComment")
    public TestComments createComment(@RequestBody TestComments testComments) {
        return testService.createComment(testComments);
    }

    @PutMapping("/updateComment/{t}/{id}")
    public void updateComment(@PathVariable("t") String t,@PathVariable("id") Long id) {
        testService.updateComment(t,id);
    }

    @DeleteMapping("/deleteComment/{id}")
    public void deleteComment(@PathVariable("id") Long id) {
        testService.deleteComment(id);
    }


}
