package tn.esprit.codemasters.service;

import tn.esprit.codemasters.entity.Claim;
import tn.esprit.codemasters.entity.User;

import java.util.List;

public interface IClaimService {
    public List<Claim> retrieveAllClaims();
    public Claim retrieveClaim(Long claimId);
    public void deleteClaim(long claimId);
    public String addClaim(Claim claim);
    public Claim updateClaim(long id, Claim claim);
    public List<Claim> searchClaims(String searchTerm);
    public void createAndAssignClaim(Claim claim, User user);
}
