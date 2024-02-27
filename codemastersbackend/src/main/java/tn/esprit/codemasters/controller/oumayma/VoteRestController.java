package tn.esprit.codemasters.controller.oumayma;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import tn.esprit.codemasters.entity.Vote;
import tn.esprit.codemasters.service.oumayma.IVoteService;

import java.util.List;

@RestController
@RequestMapping("vote")
public class VoteRestController {
    @Autowired
    IVoteService iVoteService;

    @PostMapping("/add-vote/{idUser}/{idUserStory}/{idCard}")
    public Vote addVote(@RequestBody Vote vote, @PathVariable("idUser")Long idUser
                        ,@PathVariable("idUserStory")Long idUserStory
                        ,@PathVariable("idCard")Long idCard) {
        return iVoteService.addVote(vote,idUser,idUserStory,idCard);}

    @GetMapping("/find-all-votes")
    public List<Vote> getVotes() {
        return iVoteService.AllVotes();
    }

    @PutMapping("/update-vote/{idvote}")
    public Vote updateVote(@PathVariable Long idvote, @RequestBody Vote updatedVote) {
        return iVoteService.updateVote(idvote, updatedVote);
    }
    @DeleteMapping("/remove-vote/{vote-id}")
    public void removeVote(@PathVariable("vote-id") Long id) {
        iVoteService.removeVote(id);
    }



    }

