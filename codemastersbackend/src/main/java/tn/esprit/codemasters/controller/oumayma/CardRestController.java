package tn.esprit.codemasters.controller.oumayma;


import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.codemasters.entity.Card;
import tn.esprit.codemasters.service.card.CardService;

import java.util.List;

@RestController
@RequestMapping("card")
@AllArgsConstructor
public class CardRestController {
    private final CardService cardService;

    @GetMapping(path = "/findAllCards")
    public List<Card> getAllCards(){
        List<Card> cards = cardService.getCards();
        return cards;
    }
}
