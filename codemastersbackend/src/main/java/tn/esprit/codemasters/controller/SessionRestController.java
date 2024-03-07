package tn.esprit.codemasters.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.codemasters.entity.Card;
import tn.esprit.codemasters.entity.Session;
import tn.esprit.codemasters.service.ISessionService;

import java.util.List;

@RestController
@RequestMapping("/session")
public class SessionRestController {
    @Autowired
    ISessionService iSessionService;
    @PostMapping("/add-Session")
    public Session addSession(@RequestBody Session Session) {
        return iSessionService.addSession(Session);
    }


    @GetMapping("/get-all-Cards")
    public List<Session> getSessions() {
        return iSessionService.retrieveAllSessions();
    }
    @GetMapping("/retrieve-Session/{Session-id}")
    public Session getSSession(@PathVariable("Session-id") Long id) {
        return iSessionService.retrieveSession(id);
    }


    @PutMapping("/modify-Session")
    public Session modifySession(@RequestBody Session Session) {
        return iSessionService.modifySession(Session);
    }

    @DeleteMapping("/delete-Session/{Session-id}")
    public void deleteSession(@PathVariable("Session-id") Long id) {
        iSessionService.removeSession(id);
    }

    @GetMapping("/get-Sessions-by-title/{Session-title}")
    public List<Session> searchSessionsByTitle(@PathVariable("Session-title") String title) {
        return iSessionService.getSessionsbyTitle(title);
    }

}
