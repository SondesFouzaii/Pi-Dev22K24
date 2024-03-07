package tn.esprit.codemasters.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level=AccessLevel.PRIVATE)
public class UserStory implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    String name;
    String description;
    int priority;
    int estimation;

    //
    @ToString.Exclude
    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    Project project;
    @ToString.Exclude
    @OneToMany(cascade = CascadeType.ALL, mappedBy="userstory")
    @JsonIgnore
    private Set<Claim> Reclamations;
    @ToString.Exclude
    @ManyToOne
    @JsonIgnore
    User user;
 //   @ToString.Exclude

 //   @JsonIgnore
 //   @OneToMany(cascade = CascadeType.ALL, mappedBy="userstory")
 //   private Set<Task> Tasks;
}
