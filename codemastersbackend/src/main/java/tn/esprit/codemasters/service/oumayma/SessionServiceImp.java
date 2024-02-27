package tn.esprit.codemasters.service.oumayma;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.codemasters.entity.*;
import tn.esprit.codemasters.repository.CardRepository;
import tn.esprit.codemasters.repository.ProjectRepository;
import tn.esprit.codemasters.repository.SessionRepository;
import tn.esprit.codemasters.repository.UserRepository;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SessionServiceImp implements ISessionService {

    UserRepository userRepository;
    SessionRepository sessionRepository;
    ProjectRepository projectRepository;
    CardRepository cardRepository;
    private int generateRandomCode() {
        return (int) ((Math.random() * (99999999 - 10000000 + 1)) + 10000000);
    }
    private String generateValidUrl(String name, int code) {
        String formattedName = name.replaceAll("\\s+", "-");
        return "http://localhost:4200/codemasters/session/" + code + "/" + formattedName;
    }
    @Override
    public Session addSession(Session session, long idProject,long idCard) {
        Project project = projectRepository.findById(idProject).orElse(null);
        Card card = cardRepository.findById(idCard).orElse(null);
        session.setName("Session of " + project.getName());
        session.setCode(generateRandomCode()); // Génération du code
        session.setUrl(generateValidUrl(session.getName(), session.getCode())); // Génération de l'URL
        session.setEtat(Session.Etat.CLOSED);
        session.setProject(project);
        session.setCard(card);
        return sessionRepository.save(session);
    }
    @Override
    public List<Session> AllSession() {
        return sessionRepository.findAll();
    }

    @Override
    public List<Session> PlayMySessions(long idProject) {
        return sessionRepository.findByProjectId(idProject);


    }

    @Override
    public void removeSession(Long sessionId) {
        Session session=sessionRepository.findById(sessionId).get();
        session.setCard(null);
       session.setProject(null);
        sessionRepository.save(session);
        sessionRepository.deleteById(sessionId);

    }

    @Override
    public Session updateSession(long idSession,long idProject,long idCard, Session updatedSession) {
        Optional<Session> optionalSession = sessionRepository.findById(idSession);
        if (optionalSession.isPresent()) {
            Session session = optionalSession.get();
            Project project = projectRepository.findById(idProject).orElse(null);
            Card card = cardRepository.findById(idCard).orElse(null);

            if (project == null || card == null) {
                // Si le projet ou la carte n'existe pas, on ne peut pas mettre à jour la session
                return null;
            }

            session.setName("Session of " + project.getName());
            session.setDateSession(updatedSession.getDateSession());
            session.setTimeSession(updatedSession.getTimeSession());
            session.setEtat(updatedSession.getEtat());
            session.setCode(generateRandomCode());
            session.setUrl(generateValidUrl(session.getName(), session.getCode()));

            // Mise à jour des relations avec le projet et la carte
            session.setProject(project);
            session.setCard(card);

            return sessionRepository.save(session);
        } else {
            return null; // Session non trouvée
        }
    }

    @Override
    public String getSessionState(long idSession) {
        Session session = sessionRepository.findById(idSession).orElse(null);
        Session.Etat etat = session.getEtat();
        if (etat == Session.Etat.CLOSED) {
            return "Session didn't started yet,please come back later ";
        } else if (etat == Session.Etat.ACTIVE) {
            return "Session in progress,you are welcome to join ";
        } else if (etat == Session.Etat.EXPIRED) {
            return "Session expired";
        }
        return "Unknown session state";
    }

    @Override
    public void startSession(long idSession ) {
        Session session = sessionRepository.findById(idSession).orElse(null);
        if (session != null) {
            session.setEtat(Session.Etat.ACTIVE);
            // Set startDate to the current time in UTC using Instant.now()
            Date startDate = Date.from(Instant.now());
            session.setStartSessionDate(startDate);
            sessionRepository.save(session);
        }
    }

    @Override
    public void endSession(long idSession) {
        Session session = sessionRepository.findById(idSession).orElse(null);
        if (session != null) {
            session.setEtat(Session.Etat.EXPIRED);
            // Set startDate to the current time in UTC using Instant.now()
            Date EndDate = Date.from(Instant.now());
            session.setEndSessionDate(EndDate);
            sessionRepository.save(session);
        }

    }

    @Override
    public void inviteTeamToSession(Session session) {
        // 1. Récupérer le projet associé à la session :
        Project project = session.getProject();

        // 2. S'assurer que le projet a une équipe associée :
        if (project != null && project.getTeam() != null) {
            // 3. Récupérer l'équipe du projet :
            Team team = project.getTeam();

            // 4. Envoyer les invitations à tous les membres de l'équipe :
            for (User user : team.getUsers()) {
                // Simuler l'envoi d'une invitation à l'utilisateur
                // Vous devrez remplacer cette ligne par votre mécanisme d'invitation réel
                System.out.println("Invitation envoyée à " + user.getEmail()); // Example
            }
        } else {
            // Traiter le cas où le projet n'a pas d'équipe associée
            System.out.println("Le projet n'a pas d'équipe associée pour l'invitation.");
        }
    }

    @Override
    public void quitSession(Session session, User user) {
        // 1. Récupérer le projet associé à la session
        Project project = session.getProject();

        // 2. Récupérer l'équipe du projet
        Team team = project.getTeam();

        // 3. Vérifier si l'utilisateur est membre de l'équipe
        if (team.getUsers().contains(user)) {
            // 4. Supprimer l'utilisateur de la liste des participants
            team.getUsers().remove(user);

            // 5. Sauvegarder les modifications
            sessionRepository.save(session);

            // 6. Envoyer une notification
            // Simuler l'envoi d'une notification
            // 6. Envoyer une notification
            String fullName = user.getFirst_name() + " " + user.getLast_name();
            System.out.println("Notification envoyée : " + fullName + " a quitté la session.");
        } else {
            // Traiter le cas où l'utilisateur n'est pas membre de l'équipe
            System.out.println("L'utilisateur n'est pas membre de l'équipe du projet associé à la session.");
        }
    }


}
