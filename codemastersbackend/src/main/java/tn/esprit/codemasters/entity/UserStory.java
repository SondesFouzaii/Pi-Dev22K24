package tn.esprit.codemasters.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.Set;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level=AccessLevel.PRIVATE)
public class UserStory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    String name;
    String description;
    int priority;
    int estimation;

    //
    @ManyToOne(cascade = CascadeType.ALL)
    Project project;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="userstory")
    private Set<Claim> Reclamations;

    @ManyToOne
    User user;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="userstory")
    private Set<Task> Tasks;
}
