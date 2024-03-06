package tn.esprit.codemasters.controller.oumayma;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.codemasters.entity.Session;
import tn.esprit.codemasters.entity.User;
import tn.esprit.codemasters.service.oumayma.ISessionService;

import java.time.Instant;
import java.util.List;
import java.util.TimeZone;

import org.springframework.ui.Model;


@RestController
@RequestMapping("session")
public class SessionRestController {
    @Autowired
    ISessionService iSessionService;

    @PostMapping("/add-session/{idproject}/{idcard}")
    public Session addSession(@RequestBody Session session,
                              @PathVariable("idproject")Long idProject,
                              @PathVariable("idcard")Long idCard) {
        return iSessionService.addSession(session,idProject,idCard);}

    @GetMapping("/find-all-sessions")
    public List<Session> getSessions() {
        return iSessionService.AllSession();
    }



    @GetMapping("/sessions-state/{idSession}")
    public String getSessionState(@PathVariable("idSession") long idSession) {
            return iSessionService.getSessionState(idSession) ;
    }


    @GetMapping("/find-session-by-id/{sessionId}")
    public Session getSessionById(@PathVariable Long sessionId) {
        return iSessionService.findSessionById(sessionId);
    }

    @PutMapping("/update-sessions")
    public Session updateSession(
                                 @RequestBody Session updatedSession) {

        return iSessionService.updateSession(updatedSession);
    }
    @DeleteMapping("/remove-session/{session-id}")
    public void removeSession(@PathVariable("session-id") Long id) {
        iSessionService.removeSession(id);
    }

    @PutMapping("/start")
    public Session startSession(@RequestBody Session session ) {
        Session session1 = iSessionService.startSession(session.getId());
        return session1;
    }

    @PutMapping("/end")
    public Session endSession(@RequestBody Session session) {
        Session session1 = iSessionService.endSession(session.getId());
        return session1; // Pass startTime as an argument
    }






    @PutMapping("/quit-session")
    public void quitSession(@RequestBody Session session, @RequestBody User user) {
        iSessionService.quitSession(session, user);
    }

//    @GetMapping(path = "/my-Sessions/{userId}")
//    public List<Session> getMySessions(@PathVariable(name = "userId") Long userId){
//        List<Session> mySessions =  iSessionService.getMySessions(userId);
//    }

    @GetMapping("/find-session-by-code/{code}")
    public Session getSessionByCode(@PathVariable(name = "code") Integer code) {
        return iSessionService.findSessionByCode(code);
    }













}

