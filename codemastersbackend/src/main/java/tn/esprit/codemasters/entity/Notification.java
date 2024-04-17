package tn.esprit.codemasters.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * Represents a notification.
 */
@Entity
@Table(name = "notification")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String title;
    String message;
    boolean isRead;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "creation_date")
    Date creationDate;
    @PrePersist
    protected void onCreate() {
        creationDate = new Date();
    }

    @PostLoad
    protected void onLoad() {
        if (getCreationDate() != null) {
            creationDate = new Date(getCreationDate().getTime());
        }
    }
    /**
     * Users who have received this notification.
     */

    @ManyToMany(mappedBy = "notifications", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<User> users = new HashSet<>();
    /**
     * Adds a user to the notification's recipient list.
     *
     * @param user The user to add.
     */

    public void addUser(User user) {
        if (!users.contains(user)) {
            users.add(user);
            user.getNotifications().add(this);
        }
    }
    /**
     * Removes a user from the notification's recipient list.
     *
     * @param user The user to remove.
     */

    public void removeUser(User user) {
        if (users.contains(user)) {
            users.remove(user);
            user.getNotifications().remove(this);
        }
    }
    /**
     * Marks the notification as read.
     */
    public void markAsRead() {
        // Implémentez la logique pour marquer la notification comme lue
        this.isRead = true;
    }

    public void sendNotification(User user) {
        // Implémentez la logique pour envoyer la notification à l'utilisateur spécifié
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Notification that = (Notification) o;
        return id.equals(that.id) && title.equals(that.title) && message.equals(that.message);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, message);
    }


}