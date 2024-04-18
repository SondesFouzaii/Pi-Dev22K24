package tn.esprit.codemasters.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.codemasters.entity.user.CallUser;
import tn.esprit.codemasters.entity.user.User;
import tn.esprit.codemasters.service.houssem.ICallService;

import java.util.List;

@RestController
@RequestMapping("call")
public class CallRestController {
    @Autowired
    ICallService callService;

    @GetMapping("/isSomeoneCallingMe/{id}")
    public boolean isSomeoneCallingMe(@PathVariable("id") Long id) {
        return callService.isSomeoneCallingMe(id);
    }

    @PostMapping("/make-call")
    public void makeACall(@RequestBody CallUser call) {
        callService.makeACall(call);
    }

    @GetMapping("/whoIsCallingMe/{id}")
    public User whoIsCallingMe(@PathVariable("id") Long id) {
        return callService.whoIsCallingMe(id);
    }

    @GetMapping("/pickUpThePhone")
    public void pickUpThePhone() {
        callService.pickUpThePhone();
    }

    @GetMapping("/getMyCallHistory/{id}")
    public List<CallUser> getMyCallHistory(@PathVariable("id")Long id) {
        return callService.getMyCallHistory(id);
    }


}
