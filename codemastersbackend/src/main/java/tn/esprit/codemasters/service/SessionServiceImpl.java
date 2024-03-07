package tn.esprit.codemasters.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.codemasters.entity.Session;
import tn.esprit.codemasters.repository.SessionRepository;

import java.util.List;
@Service
@AllArgsConstructor
public class SessionServiceImpl implements ISessionService{
    SessionRepository sessionRepository;
    @Override
    public List<Session> retrieveAllSessions() {
        return sessionRepository.findAll();
    }

    @Override
    public Session retrieveSession(Long SessionId) {
        return sessionRepository.findById(SessionId).orElse(null);
    }

    @Override
    public Session addSession(Session s) {
        return sessionRepository.save(s);
    }

    @Override
    public void removeSession(Long SessionId) {
        sessionRepository.deleteById(SessionId);

    }

    @Override
    public Session modifySession(Session session) {
        return sessionRepository.save(session);
    }

    @Override
    public List<Session> getSessionsbyTitle(String name) {
        return sessionRepository.findByName(name);
    }
}
