package tn.esprit.codemasters.service;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;
import tn.esprit.codemasters.entity.Claim;
import lombok.AllArgsConstructor;
import tn.esprit.codemasters.entity.user.User;
import tn.esprit.codemasters.entity.UserStory;
import tn.esprit.codemasters.repository.ClaimRepository;
import tn.esprit.codemasters.repository.UserRepository;
import tn.esprit.codemasters.repository.UserStoryRepository;

import java.util.List;
import java.util.Optional;

@Service

@AllArgsConstructor
public class ClaimServiceImp implements IClaimService{
    ClaimRepository claimRepository;
    UserRepository userRepository;
    UserStoryRepository userStoryRepository;

    @Override
    public List<Claim> retrieveAllClaims() {

        return claimRepository.findAll();
    }

    @Override
    public Claim retrieveClaim(Long claimId) {
        return claimRepository.findById(claimId).orElse(null);
    }

    @Override
    public void deleteClaim(long claimId) {
        Claim claim = claimRepository.findById(claimId).orElseThrow(() -> new NotFoundException("Claim not found"));

        claimRepository.delete(claim);
    }

    @Override
    public String addClaim(Claim claim) {
        try {
            // Récupérer l'utilisateur par son nom
            Optional<User> optionalUser = userRepository.findByEmail(claim.getUser().getEmail());
            if (optionalUser == null) {
                return "User not found";
            }

            // Récupérer l'histoire d'utilisateur par son nom
            UserStory userStory = userStoryRepository.findByName(claim.getUserstory().getName());
            if (userStory == null) {
                return "UserStory not found";
            }

            // Affecter l'utilisateur et l'histoire d'utilisateur à la réclamation
            claim.setUser(optionalUser.get());
            claim.setUserstory(userStory);

            Claim savedClaim = claimRepository.save(claim);


            return "Claim added successfully with ID: " + savedClaim.getId();
        } catch (Exception e) {
            return "Failed to add claim";
        }
    }

    @Override
    public Claim updateClaim(long id, Claim claim) {
        Claim existingClaim = claimRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Claim not found"));

        existingClaim.setTitle(claim.getTitle());
        existingClaim.setContent(claim.getContent());


        return claimRepository.save(existingClaim);
    }

    @Override
    public List<Claim> searchClaims(String searchTerm) {
        return claimRepository.searchClaims(searchTerm);
    }




}
