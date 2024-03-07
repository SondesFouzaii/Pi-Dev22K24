package tn.esprit.codemasters.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import tn.esprit.codemasters.entity.Card;
import tn.esprit.codemasters.entity.Session;
import tn.esprit.codemasters.entity.Sprint;
import tn.esprit.codemasters.entity.Task;
import tn.esprit.codemasters.service.ICardService;
import tn.esprit.codemasters.service.ISessionService;
import tn.esprit.codemasters.service.ITaskService;

import java.util.List;

@RestController
@RequestMapping("/card")
public class CardRestController {
    @Autowired
    ICardService iCardService;
    @Autowired
    ISessionService iSessionService;
    @Autowired
    ITaskService taskService;


    @PutMapping(value = "/showcard/{cardValue}/{taskId}"/*, consumes = MediaType.APPLICATION_JSON_VALUE*/)
    public void addCardvalueToTask(@PathVariable("cardValue") Long v, @PathVariable("taskId") Long id) {
        iCardService.addCardvalueToTask(v, id);
    }




    @GetMapping("/retrieve-all-tasks")
    public List<Task> getTasks() {
        return taskService.retrieveAllTasks();
    }

    @GetMapping("/get-all-sessions")
    public List<Session> getSessions() {
        return iSessionService.retrieveAllSessions();
    }

    @GetMapping("/get-all-Cards")
    public List<Card> getAllCards() {
        return iCardService.retrieveAllCards();
    }

    @PostMapping("/add-Card")
    public Card addCard(@RequestBody Card card) {
        return iCardService.addCard(card);
    }

    @GetMapping("/retrieve-Card/{Card-id}")
    public Card getSCard(@PathVariable("Card-id") Long id) {
        return iCardService.retrieveCard(id);
    }


    @PutMapping("/modify-Card")
    public Card modifyCard(@RequestBody Card Card) {
        return iCardService.modifyCard(Card);
    }

    @DeleteMapping("/delete-Card/{Card-id}")
    public void deleteCard(@PathVariable("Card-id") Long id) {
        iCardService.removeCard(id);
    }

    @GetMapping("/get-Cards-by-title/{Card-title}")
    public List<Card> searchCardsByTitle(@PathVariable("Card-title") String title) {
        return iCardService.getCardsbyTitle(title);
    }


}
