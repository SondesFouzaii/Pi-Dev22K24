package tn.esprit.codemasters.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.codemasters.entity.Test;
import tn.esprit.codemasters.entity.User;
import tn.esprit.codemasters.service.houssem.ITestService;
import tn.esprit.codemasters.service.houssem.IUserService;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("quiz")
public class TestRestController {
    @Autowired
    ITestService testService;
    @PostMapping("/add-test")
    public String addSimpleUser(@RequestBody Test test) {
        return testService.addTest(test);
    }

    @GetMapping("/retrieve-all-users")
    public List<Test> getusers() {
        return testService.retrieveAllTests();
    }

}
