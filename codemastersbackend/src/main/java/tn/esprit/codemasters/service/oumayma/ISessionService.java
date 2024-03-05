package tn.esprit.codemasters.service.oumayma;


import tn.esprit.codemasters.entity.Session;
import tn.esprit.codemasters.entity.Team;
import tn.esprit.codemasters.entity.User;

import java.time.Instant;
import java.util.List;

public interface ISessionService {


    public Session addSession(Session c,long idProject,long idCard);

    public List<Session> PlayMySessions(long idProject);

    public Session findSessionById(long idSession);
    public List<Session> AllSession();
    public void removeSession(Long sessionId);
    public Session updateSession(Session updatedSession) ;

    public String getSessionState(long idSession);

    public Session startSession(long idSession);
    public Session endSession(long idSession);

    public void inviteTeamToSession(Session session);

    public void quitSession(Session session, User user);

    List<Session> getMySessions(Long userId);

    Session findSessionByCode(Integer code);


    //   public void seeTheSessionImInvitedInMyaclendar();
    //    public void reserveSession();

}
