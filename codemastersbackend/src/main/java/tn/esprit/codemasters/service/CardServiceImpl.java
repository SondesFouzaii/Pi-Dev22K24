package tn.esprit.codemasters.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.codemasters.entity.Card;
import tn.esprit.codemasters.entity.Task;
import tn.esprit.codemasters.repository.CardRepository;
import tn.esprit.codemasters.repository.TaskRepository;

import java.util.List;
@Service
@AllArgsConstructor
public class CardServiceImpl implements ICardService{
    CardRepository cardRepository;
    TaskRepository taskRepository;
    @Override
    public List<Card> retrieveAllCards() {
        return cardRepository.findAll();
    }

    @Override
    public Card retrieveCard(Long CardId) {
        return cardRepository.findById(CardId).orElse(null);
    }

    @Override
    public Card addCard(Card s) {
        return cardRepository.save(s);
    }


    @Override
    public void addCardvalueToTask(Long v ,Long Taskid) {
Task task =taskRepository.findById(Taskid).orElse(null);
        //assert task != null;
        task.setCardvalue(v);
        taskRepository.save(task);
    }

    @Override
    public void removeCard(Long CardId) {
        cardRepository.deleteById(CardId);

    }


    @Override
    public Card modifyCard(Card card) {
        return cardRepository.save(card);
    }

    @Override
    public List<Card> getCardsbyTitle(String name) {
        return cardRepository.findByName(name);
    }
}
