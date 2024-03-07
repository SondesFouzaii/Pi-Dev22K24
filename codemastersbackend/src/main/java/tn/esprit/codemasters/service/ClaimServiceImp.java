package tn.esprit.codemasters.service;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;
import tn.esprit.codemasters.entity.Claim;
import lombok.AllArgsConstructor;
import tn.esprit.codemasters.entity.User;
import tn.esprit.codemasters.entity.UserStory;
import tn.esprit.codemasters.repository.ClaimRepository;
import tn.esprit.codemasters.repository.UserRepository;
import tn.esprit.codemasters.repository.UserStoryRepository;

import java.util.List;
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
            User user = userRepository.findByName(claim.getUser().getName());
            if (user == null) {
                return "User not found";
            }

            // Récupérer l'histoire d'utilisateur par son nom
            UserStory userStory = userStoryRepository.findByName(claim.getUserstory().getName());
            if (userStory == null) {
                return "UserStory not found";
            }

            // Affecter l'utilisateur et l'histoire d'utilisateur à la réclamation
            claim.setUser(user);
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
    @Autowired
    private EmailService emailService;

    @Transactional
    public void createAndAssignClaim(Claim claim, User user) {
        System.out.println("Début de la création et attribution d'une réclamation à " + user.getEmail());

        // Vérifiez et préparez l'objet User (si nécessaire)
        User assignedUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // Log pour confirmer la récupération de l'utilisateur
        System.out.println("Utilisateur assigné trouvé : " + assignedUser.getEmail());

        // Attribuez l'utilisateur à la réclamation et définissez d'autres propriétés nécessaires
        claim.setUser(assignedUser);

        // Enregistrez la réclamation dans la base de données
        claimRepository.save(claim);

        // Log avant d'envoyer l'email
        System.out.println("Tentative d'envoi d'email à " + assignedUser.getEmail());

        // Envoyer un email de notification à l'utilisateur assigné
        emailService.sendSimpleMessage(
                assignedUser.getEmail(),
                "Nouvelle Réclamation Assignée",
                "Une nouvelle réclamation a été assignée à vous. Veuillez vérifier le système pour plus de détails."
        );

        // Log après l'envoi de l'email
        System.out.println("Email envoyé à " + assignedUser.getEmail());
    }


}
