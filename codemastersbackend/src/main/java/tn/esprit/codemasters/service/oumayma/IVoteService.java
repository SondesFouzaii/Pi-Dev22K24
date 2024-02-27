package tn.esprit.codemasters.service.oumayma;



import tn.esprit.codemasters.entity.Vote;

import java.util.List;

public interface IVoteService {


    public Vote addVote(Vote vote, long idUserStory, long idUser,long idCard);

    public List<Vote> AllVotes();
    public void removeVote(Long voteId);
    public Vote updateVote(Long idVote, Vote updatedVote) ;


}
