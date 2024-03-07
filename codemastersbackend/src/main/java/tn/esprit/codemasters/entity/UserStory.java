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

    //
    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    Project project;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="userstory")
    @JsonIgnore
    private Set<Claim> Claims;

    @ManyToOne
    @JsonIgnore
    User user;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="userstory")
    @JsonIgnore
    private Set<Task> Tasks;
}
