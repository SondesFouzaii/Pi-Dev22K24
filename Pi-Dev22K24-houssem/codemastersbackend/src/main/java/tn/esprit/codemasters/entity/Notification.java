package tn.esprit.codemasters.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "notification")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String title;
    String message;
    boolean isRead;

    @ManyToMany(mappedBy = "notifications", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<User> users = new HashSet<>();

    public void addUser(User user) {
        if (!users.contains(user)) {
            users.add(user);
            user.getNotifications().add(this);
        }
    }

    public void removeUser(User user) {
        if (users.contains(user)) {
            users.remove(user);
            user.getNotifications().remove(this);
        }
    }

    public void markAsRead() {
        // Implémentez la logique pour marquer la notification comme lue
        this.isRead = true;
    }

    public void sendNotification(User user) {
        // Implémentez la logique pour envoyer la notification à l'utilisateur spécifié
    }

    public void setUser(User user) {
        this.users.clear();
        this.users.add(user);
        user.getNotifications().add(this);
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