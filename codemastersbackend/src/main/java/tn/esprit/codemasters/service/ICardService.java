package tn.esprit.codemasters.service;

import tn.esprit.codemasters.entity.Card;
import tn.esprit.codemasters.entity.Task;

import java.util.List;

public interface ICardService {
    public List<Card> retrieveAllCards();
    public Card retrieveCard(Long CardId);
    public Card addCard(Card s);
    public void removeCard(Long CardId);
    public Card modifyCard(Card card);
    public List<Card> getCardsbyTitle(String title);
    public void addCardvalueToTask(Long v , Long Taskid);
}
