package tn.esprit.codemasters.service.oumayma;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import tn.esprit.codemasters.entity.Card;
import tn.esprit.codemasters.entity.User;
import tn.esprit.codemasters.entity.UserStory;
import tn.esprit.codemasters.entity.Vote;
import tn.esprit.codemasters.repository.*;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class VoteServiceImp implements IVoteService {

    UserRepository userRepository;
    SessionRepository sessionRepository;
    ProjectRepository projectRepository;
    VoteRepository voteRepository ;
    UserStoryRepository userStoryRepository ;
    CardRepository cardRepository ;

    private int calculateVoteValue(Card card) {
        // Define the priority order for v1 through v10
        int[] priorities = {card.getV1(), card.getV2(), card.getV3(), card.getV4(), card.getV5(),
                card.getV6(), card.getV7(), card.getV8(), card.getV9(), card.getV10()};

        // Iterate through priorities and return the first non-zero value
        for (int priority : priorities) {
            if (priority != 0) {
                return priority;
            }
        }

        // If all values are zero, return 0 (or handle this case according to your requirements)
        return 0;
//        // Iterate through v1 to v10 and return the first non-zero value
//        if (card.getV1() != 0) {
//            return card.getV1();
//        } else if (card.getV2() != 0) {
//            return card.getV2();
//        } else if (card.getV3() != 0) {
//            return card.getV3();
//        } else if (card.getV4() != 0) {
//            return card.getV4();
//        } else if (card.getV5() != 0) {
//            return card.getV5();
//        } else if (card.getV6() != 0) {
//            return card.getV6();
//        } else if (card.getV7() != 0) {
//            return card.getV7();
//        } else if (card.getV8() != 0) {
//            return card.getV8();
//        } else if (card.getV9() != 0) {
//            return card.getV9();
//        } else {
//            return card.getV10();
//        }
    }


    @Override
    @Transactional
    public Vote addVote(Vote vote, long idUserStory, long idUser,long idCard) {
        UserStory userStory = userStoryRepository.findById(idUserStory).orElse(null);
        User user = userRepository.findById(idUser).orElse(null);
        Card card = cardRepository.findById(idCard).orElse(null);
        int value = calculateVoteValue(card);

        vote.setUserstory(userStory);
        vote.setUser(user);
        vote.setCard(card);
        vote.setValue(value);
        return voteRepository.save(vote);
    }

    @Override
    public List<Vote> AllVotes() {
        return voteRepository.findAll();
    }

    @Override
    public void removeVote(Long voteId) {
        voteRepository.deleteById(voteId);
    }

    @Override
    public Vote updateVote(Long idVote, Vote updatedVote) {
        Optional<Vote> optionalSession = voteRepository.findById(idVote);
        if (optionalSession.isPresent()) {
            Vote vote = optionalSession.get();
            vote.setValue(updatedVote.getValue());
            return voteRepository.save(vote);
        } else {
            return null;
        }
    }
}
