package tn.esprit.codemasters.service.oumayma;


import tn.esprit.codemasters.entity.Session;
import tn.esprit.codemasters.entity.Team;
import tn.esprit.codemasters.entity.User;

import java.time.Instant;
import java.util.List;

public interface ISessionService {


    public Session addSession(Session c,long idProject,long idCard);

    public List<Session> PlayMySessions(long idProject);
    public List<Session> AllSession();
    public void removeSession(Long sessionId);
    public Session updateSession(long idSession,long idProject,long idCard,Session updatedSession) ;

    public String getSessionState(long idSession);

    public void startSession(long idSession);
    public void endSession(long idSession);

    public void inviteTeamToSession(Session session);

    public void quitSession(Session session, User user);

     //   public void seeTheSessionImInvitedInMyaclendar();
    //    public void reserveSession();

}
