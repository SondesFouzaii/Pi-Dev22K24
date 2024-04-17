package tn.esprit.codemasters.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @JsonIgnore
    @ManyToOne
    Project project;

    @OneToMany(mappedBy="userstory")
    private Set<Claim> Reclamations;
    @JsonIgnore
    @ManyToOne
    User user;
    @JsonIgnore
    @OneToMany( mappedBy="userstory")
    private Set<Task> Tasks;
}
