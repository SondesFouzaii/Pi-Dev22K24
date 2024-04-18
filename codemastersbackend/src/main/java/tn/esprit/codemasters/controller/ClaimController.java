package tn.esprit.codemasters.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.webjars.NotFoundException;
import tn.esprit.codemasters.entity.Claim;

import tn.esprit.codemasters.entity.UserStory;
import tn.esprit.codemasters.repository.ClaimRepository;
import tn.esprit.codemasters.repository.UserRepository;
import tn.esprit.codemasters.repository.UserStoryRepository;
import tn.esprit.codemasters.service.IClaimService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
@RequestMapping("/claims")
@RestController
public class ClaimController {
    @Autowired
    IClaimService claimService;


    @GetMapping("/retrieveAllClaims")
    public List<Claim> retrieveAllClaims() {
        return claimService.retrieveAllClaims();
    }

    @GetMapping("/retrieveClaims/{ClaimId}")
    public Claim retrieveClaim(@PathVariable("ClaimId") Long claimId) {
        return claimService.retrieveClaim(claimId);
    }

    @DeleteMapping("/deleteClaim/{claim-id}")
    public void deleteClaim(@PathVariable("claim-id") Long claimId) {
        claimService.deleteClaim(claimId);
    }

    @PostMapping("/createClaim")
    public ResponseEntity<Map<String, String>> addClaim(@RequestBody Claim claim) {
        String response = claimService.addClaim(claim);
        Map<String, String> responseMap = new HashMap<>();
        responseMap.put("message", response);
        return ResponseEntity.ok(responseMap);
    }

    @PutMapping("/claims/update/{id}")
    public ResponseEntity<Claim> updateClaim(@PathVariable long id, @RequestBody Claim claim) {
        Claim updatedClaim = claimService.updateClaim(id, claim);
        return ResponseEntity.ok(updatedClaim);
    }
    @GetMapping("/search")
    public ResponseEntity<List<Claim>> searchClaims(@RequestParam(value = "searchTerm") String searchTerm) {
        List<Claim> claims = claimService.searchClaims(searchTerm);
        return ResponseEntity.ok(claims);
    }
    @Autowired
    private ClaimRepository claimRepository;

    @GetMapping("/claims")
    public Page<Claim> getClaims(Pageable pageable) {
        return claimRepository.findAll(pageable);
    }


}