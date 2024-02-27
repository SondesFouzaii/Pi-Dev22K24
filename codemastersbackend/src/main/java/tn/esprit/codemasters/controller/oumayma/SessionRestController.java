package tn.esprit.codemasters.controller.oumayma;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.codemasters.entity.Session;
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

    @GetMapping("/find-my-sessions")
    public List<Session> getMySessions( long projectId ,long userId) {
        return iSessionService.PlayMySessions(projectId);
    }

    @PutMapping("/update-sessions/{idsession}/{idproject}/{idcard}")
    public Session updateSession(@PathVariable Long idsession,
                                 @PathVariable Long idproject,
                                 @PathVariable Long idcard,
                                 @RequestBody Session updatedSession) {

        return iSessionService.updateSession(idsession, idproject,idcard,updatedSession);
    }
    @DeleteMapping("/remove-session/{session-id}")
    public void removeSession(@PathVariable("session-id") Long id) {
        iSessionService.removeSession(id);
    }

    @PutMapping("/start/{idSession}")
    public void startSession(@PathVariable("idSession") long idSession) {
        // Set the time zone to your PC's time zone (UTC+01:00)
        TimeZone.setDefault(TimeZone.getTimeZone("Europe/Paris")); // Adjust if needed
        iSessionService.startSession(idSession); // Pass startTime as an argument
    }

    @PutMapping("/end/{idSession}")
    public void endSession(@PathVariable("idSession") long idSession) {
        // Set the time zone to your PC's time zone (UTC+01:00)
        TimeZone.setDefault(TimeZone.getTimeZone("Europe/Paris")); // Adjust if needed
        iSessionService.endSession(idSession); // Pass startTime as an argument
    }













    }

