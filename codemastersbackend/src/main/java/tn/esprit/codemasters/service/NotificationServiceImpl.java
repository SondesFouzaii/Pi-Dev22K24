package tn.esprit.codemasters.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.codemasters.entity.Notification;
import tn.esprit.codemasters.entity.User;
import tn.esprit.codemasters.repository.NotificationRepository;

import java.util.*;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements INotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public void markAsRead(Notification notification) {
        notification.setRead(true);
        // Mettez à jour la notification dans la base de données
        notificationRepository.save(notification);
        // Autres opérations nécessaires...
    }

    @Override
    public void sendNotification(User user, Notification notification) {
        Set<User> users = new HashSet<>();
        notification.setUsers(users);
        // Save the notification in the database
        notificationRepository.save(notification);
    }
  /*  @Override
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }*/
  @Override
  public List<Notification> getAllNotifications() {
      List<Notification> notifications = notificationRepository.findAll();
      // Tri des notifications par date (ou autre critère)
      notifications.sort(Comparator.comparing(Notification::getCreationDate).reversed());
      return notifications;
  }

    @Override
    public void deleteNotification(Long notificationId) {
        Optional<Notification> optionalNotification = notificationRepository.findById(notificationId);
        if (optionalNotification.isPresent()) {
            Notification notification = optionalNotification.get();
            notificationRepository.delete(notification);
        }
    }
}