package tn.esprit.codemasters.service;

import tn.esprit.codemasters.entity.Notification;
import tn.esprit.codemasters.entity.User;

import java.util.List;

public interface INotificationService {
    void markAsRead(Notification notification);
    void sendNotification(User user, Notification notification);
    List<Notification> getAllNotifications();
    void deleteNotification(Long notificationId);
}
