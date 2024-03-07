package tn.esprit.codemasters.service;

import tn.esprit.codemasters.entity.Card;
import tn.esprit.codemasters.entity.Session;

import java.util.List;

public interface ISessionService {
    public List<Session> retrieveAllSessions();
    public Session retrieveSession(Long SessionId);
    public Session addSession(Session s);
    public void removeSession(Long SessionId);
    public Session modifySession(Session card);
    public List<Session> getSessionsbyTitle(String title);
}
