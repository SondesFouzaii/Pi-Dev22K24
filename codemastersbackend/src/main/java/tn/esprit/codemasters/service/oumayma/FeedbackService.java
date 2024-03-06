package tn.esprit.codemasters.service.oumayma;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.codemasters.entity.FeedBack;
import tn.esprit.codemasters.entity.Session;
import tn.esprit.codemasters.repository.FeedBackRepository;
import tn.esprit.codemasters.repository.SessionRepository;

import java.util.Objects;

@Service
@AllArgsConstructor
public class FeedbackService {
    private final FeedBackRepository feedBackRepository;
    private final SessionRepository sessionRepository;
    public FeedBack addFeedback(FeedBack feedback, Long sessionId) {
        Session session = sessionRepository.findById(sessionId).orElse(null);
        if (Objects.nonNull(session)){
            feedback.setSession(session);
        }
        FeedBack feedBack1 = this.feedBackRepository.save(feedback);
        return feedBack1;
    }
}
