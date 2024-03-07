package tn.esprit.codemasters.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
@Data
@AllArgsConstructor
//@Entity
public class ChatMessage {
  //  @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
  //  private Long id;
    String message;
    String user;
    private Long senderId;
    private Long recipientId;
    public ChatMessage(String message, String user) {
        this.message = message;
        this.user = user;
    }


    public ChatMessage() {

    }
}
