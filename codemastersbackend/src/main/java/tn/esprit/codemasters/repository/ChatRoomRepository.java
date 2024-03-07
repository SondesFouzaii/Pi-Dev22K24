package tn.esprit.codemasters.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.codemasters.entity.ChatRoom;

import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    Optional<ChatRoom> findBySenderIdAndRecipientId(String senderId, String recipientId);
}
