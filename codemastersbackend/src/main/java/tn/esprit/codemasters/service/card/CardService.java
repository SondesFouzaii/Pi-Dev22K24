package tn.esprit.codemasters.service.card;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.codemasters.entity.Card;
import tn.esprit.codemasters.repository.CardRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class CardService {
    private final CardRepository cardRepository;
    public List<Card> getCards(){
        List<Card> cards = this.cardRepository.findAll();
        return cards;
    }

}
