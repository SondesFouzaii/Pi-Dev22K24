package tn.esprit.codemasters.controller;

import org.springframework.beans.factory.annotation.Autowired;
import tn.esprit.codemasters.entity.Message;
import tn.esprit.codemasters.repository.MessageRepository;

import java.util.List;

public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public MessageService() {
    }

    public List<Message> getAllMessages() {
        return this.messageRepository.findAll();
    }

    public Message addMessage(Message message) {
        return (Message)this.messageRepository.save(message);
    }

    public void deleteMessage(Long id) {
        this.messageRepository.deleteById(id);
    }
}

