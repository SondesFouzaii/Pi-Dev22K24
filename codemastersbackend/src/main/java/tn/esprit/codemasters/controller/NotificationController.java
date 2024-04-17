package tn.esprit.codemasters.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.codemasters.entity.Notification;
import tn.esprit.codemasters.entity.User;
import tn.esprit.codemasters.repository.NotificationRepository;
import tn.esprit.codemasters.repository.UserRepository;
import tn.esprit.codemasters.service.INotificationService;


import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    private final INotificationService notificationService;
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;


    @Autowired
    public NotificationController(INotificationService notificationService, NotificationRepository notificationRepository, UserRepository userRepository) {
        this.notificationService = notificationService;
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;

    }

    @PutMapping("/{notificationId}/markAsRead")
    public void markNotificationAsRead(@PathVariable Long notificationId) {
        Optional<Notification> optionalNotification = notificationRepository.findById(notificationId);
//        if (optionalNotification.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Notification not found");
//        }
        Notification notification = optionalNotification.get();
        notificationService.markAsRead(notification);
//        return ResponseEntity.ok("Notification marked as read");
    }

    @PostMapping("/{userId}/sendNotification")
    public ResponseEntity<String> sendNotification(@PathVariable Long userId, @RequestBody Notification notification) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        User user = optionalUser.get();
        notificationService.sendNotification(user, notification);
        return ResponseEntity.ok().body("Notification sent to user");
    }
   /* @GetMapping
    public ResponseEntity<List<Notification>> getAllNotifications() {
        List<Notification> notifications = notificationService.getAllNotifications();
        return ResponseEntity.ok(notifications);
    }*/
   @GetMapping
   public ResponseEntity<List<Notification>> getAllNotifications() {
       List<Notification> notifications = notificationService.getAllNotifications();
       // Tri des notifications par date de création (ou autre critère)
       notifications.sort(Comparator.comparing(Notification::getCreationDate).reversed());
       return ResponseEntity.ok(notifications);
   }

    @DeleteMapping("/{notificationId}")
    public ResponseEntity<String> deleteNotification(@PathVariable Long notificationId) {
        notificationService.deleteNotification(notificationId);
        return ResponseEntity.ok("Notification deleted");
    }
}