package tn.esprit.codemasters.controller.houssem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.codemasters.entity.User;
import tn.esprit.codemasters.service.houssem.ITestService;
import tn.esprit.codemasters.service.houssem.IUserService;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("user")
public class TestRestController {
    @Autowired
    ITestService testService;


}
