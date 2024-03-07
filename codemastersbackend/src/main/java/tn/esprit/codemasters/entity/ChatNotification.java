package tn.esprit.codemasters.entity;
import lombok.*;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatNotification {
    private Long id;
    private String senderId;
    private String senderName;
}
