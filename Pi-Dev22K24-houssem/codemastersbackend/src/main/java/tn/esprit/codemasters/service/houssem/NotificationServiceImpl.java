package tn.esprit.codemasters.service.houssem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.codemasters.entity.Notification;
import tn.esprit.codemasters.entity.User;
import tn.esprit.codemasters.repository.NotificationRepository;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationServiceImpl implements INotificationService {

    private final NotificationRepository notificationRepository;

    @Autowired
    public NotificationServiceImpl(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public void markAsRead(Notification notification) {
        notification.setRead(true);
        // Mettez à jour la notification dans la base de données
        notificationRepository.save(notification);
        // Autres opérations nécessaires...
    }

    @Override
    public void sendNotification(User user, Notification notification) {
        notification.setUser(user);
        // Save the notification in the database
        notificationRepository.save(notification);
    }
    @Override
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
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